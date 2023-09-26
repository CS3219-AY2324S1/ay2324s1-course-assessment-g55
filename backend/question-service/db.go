package main

import (
	"context"

	"github.com/guregu/dynamo"
	"github.com/jackc/pgx/v5"
)

type store interface {
	createQuestion(Question) (QuestionId, error)
	getQuestion(QuestionId) (Question, error)
	getQuestions() ([]Question, error)
	updateQuestion(Question) error
	deleteQuestion(QuestionId) error
}

type questionStore struct {
	descriptionTable dynamo.Table
	pgxDb            *pgx.Conn
}

func NewQuestionStore(descriptionTable dynamo.Table, pgxDb *pgx.Conn) store {
	return &questionStore{
		descriptionTable: descriptionTable,
		pgxDb:            pgxDb,
	}
}

var queries = map[string]string{
	"get":    "select * from questions where questionId=$1",
	"getAll": "select * from questions",
	"add":    "insert into questions (questionTitle, categories, difficulty, attempts, createdAt) values ($1, $2, $3, $4, $5) returning questionId",
	"update": "update questions set questionTitle=$1, categories=$2, difficulty=$3, attempts=$4, createdAt=$5 where questionId=$6",
	"delete": "delete from questions where questionId=$1",
}

func (qs *questionStore) createQuestion(question Question) (QuestionId, error) {
	qi := question.Information
	var questionId QuestionId
	err := qs.pgxDb.QueryRow(context.Background(), queries["add"],
		qi.Title, qi.Categories, qi.Complexity, qi.Attempts, qi.CreatedAt).Scan(&questionId)
	if err != nil {
		return 0, err
	}
	questionToAdd := AwsQuestionDetail{
		Id:          questionId,
		Description: question.Details.Description,
	}
	err = qs.descriptionTable.Put(questionToAdd).If("attribute_not_exists(questionId)").Run()
	if err != nil {
		return 0, err
	}
	return questionId, nil
}

func (qs *questionStore) getQuestion(questionId QuestionId) (Question, error) {
	rows, err := qs.pgxDb.Query(context.Background(), queries["get"], questionId)
	if err != nil {
		return Question{}, err
	}
	defer rows.Close()

	questionInformation, err := pgx.CollectOneRow[PgQuestionInformation](rows, pgx.RowToStructByNameLax[PgQuestionInformation])
	if err != nil {
		return Question{}, err
	}
	questionDetail := AwsQuestionDetail{}
	err = qs.descriptionTable.Get("questionId", questionId).One(&questionDetail)
	if err != nil {
		return Question{}, err
	}

	return Question{
		Id: questionId,
		Information: QuestionInformation{
			Title:      questionInformation.Title,
			Complexity: questionInformation.Complexity,
			Categories: questionInformation.Categories,
			Attempts:   questionInformation.Attempts,
			CreatedAt:  questionInformation.CreatedAt,
		},
		Details: QuestionDetails{
			Description: questionDetail.Description,
		},
	}, nil
}

func (qs *questionStore) getQuestions() ([]Question, error) {
	rows, err := qs.pgxDb.Query(context.Background(), queries["getAll"])
	if err != nil {
		return []Question{}, err
	}
	defer rows.Close()

	questionInformations, err := pgx.CollectRows[PgQuestionInformation](rows, pgx.RowToStructByName[PgQuestionInformation])
	if err != nil {
		return []Question{}, err
	}

	var result []Question
	for _, questionInformation := range questionInformations {
		var questionDetail AwsQuestionDetail
		if err = qs.descriptionTable.Get("questionId", questionInformation.Id).One(&questionDetail); err != nil {
			return []Question{}, err
		}
		toAppend := Question{
			Id: questionInformation.Id,
			Information: QuestionInformation{
				Title:      questionInformation.Title,
				Complexity: questionInformation.Complexity,
				Categories: questionInformation.Categories,
				Attempts:   questionInformation.Attempts,
				CreatedAt:  questionInformation.CreatedAt,
			},
			Details: QuestionDetails{
				Description: questionDetail.Description,
			},
		}
		result = append(result, toAppend)
	}
	return result, nil
}

func (qs *questionStore) updateQuestion(question Question) error {
	qi := question.Information
	_, err := qs.pgxDb.Exec(context.Background(), queries["update"],
		qi.Title, qi.Categories, qi.Complexity, qi.Attempts, qi.CreatedAt, question.Id)

	if err != nil {
		return err
	}
	descriptionToUpdate := AwsQuestionDetail{
		Id:          question.Id,
		Description: question.Details.Description,
	}
	err = qs.descriptionTable.Put(descriptionToUpdate).Run()
	if err != nil {
		return err
	}
	return nil
}

func (qs *questionStore) deleteQuestion(questionId QuestionId) error {
	_, err := qs.pgxDb.Exec(context.Background(), queries["delete"], questionId)
	if err != nil {
		return err
	}
	if err != nil {
		return err
	}
	err = qs.descriptionTable.Delete("questionId", questionId).Run()
	if err != nil {
		return err
	}
	return nil
}
