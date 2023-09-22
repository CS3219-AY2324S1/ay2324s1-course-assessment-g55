package main

import (
	"context"

	"github.com/guregu/dynamo"
)

type Service interface {
	CreateQuestion(context.Context, QuestionId, Question) error
	GetQuestion(context.Context, QuestionId) (IndexedQuestion, error)
	GetQuestions(context.Context) ([]IndexedQuestion, error)
	UpdateQuestion(context.Context, QuestionId, Question) error
	DeleteQuestion(context.Context, QuestionId) error
}

type QuestionService struct {
	questions store
}

func NewQuestionService(qs store) Service {
	return &QuestionService{
		questions: qs,
	}
}

func (s *QuestionService) CreateQuestion(ctx context.Context, questionId QuestionId, question Question) error {
	return s.questions.createQuestion(questionId, question)
}

func (s *QuestionService) GetQuestion(ctx context.Context, questionId QuestionId) (IndexedQuestion, error) {
	return s.questions.getQuestion(questionId)
}

func (s *QuestionService) GetQuestions(context.Context) ([]IndexedQuestion, error) {
	return s.questions.getQuestions()
}

func (s *QuestionService) UpdateQuestion(ctx context.Context, questionId QuestionId, question Question) error {
	return s.questions.updateQuestion(questionId, question)
}

func (s *QuestionService) DeleteQuestion(ctx context.Context, questionId QuestionId) error {
	return s.questions.deleteQuestion(questionId)
}

type store interface {
	createQuestion(QuestionId, Question) error
	getQuestion(QuestionId) (IndexedQuestion, error)
	getQuestions() ([]IndexedQuestion, error)
	updateQuestion(QuestionId, Question) error
	deleteQuestion(QuestionId) error
}

type questionStore struct {
	questions dynamo.Table
}

func NewQuestionStore(questions dynamo.Table) store {
	return &questionStore{
		questions: questions,
	}
}

func (qs *questionStore) createQuestion(questionId QuestionId, question Question) error {
	err := qs.questions.Put().If("attribute_not_exists(questionId)").Run()
	if err != nil {
		return err
	}
	return nil
}

func (qs *questionStore) getQuestion(questionId QuestionId) (IndexedQuestion, error) {
	question := Question{}
	err := qs.questions.Get().One()
	if err != nil {
		return IndexedQuestion{}, err
	}
	return IndexedQuestion{questionId, question}, nil
}

func (qs *questionStore) getQuestions() ([]IndexedQuestion, error) {

	var res []IndexedQuestion
	err := qs.questions.Scan().All()

	if err != nil {
		return []IndexedQuestion{}, err
	}

	return res, nil
}

func (qs *questionStore) updateQuestion(questionId QuestionId, question Question) error {
	err := qs.questions.Put().If("attribute_exists(questionId)").Run()
	if err != nil {
		return err
	}
	return nil
}

func (qs *questionStore) deleteQuestion(questionId QuestionId) error {
	err := qs.questions.Delete().Run()
	if err != nil {
		return err
	}
	return nil
}
