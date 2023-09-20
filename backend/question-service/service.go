package main

import (
	"context"
	"errors"
	"sort"

	"golang.org/x/exp/maps"
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
	contains(QuestionId) (bool, error)
	createQuestion(QuestionId, Question) error
	getQuestion(QuestionId) (IndexedQuestion, error)
	getQuestions() ([]IndexedQuestion, error)
	updateQuestion(QuestionId, Question) error
	deleteQuestion(QuestionId) error
}

type questionStore struct {
	questions map[QuestionId]Question
}

func NewQuestionStore(questions map[QuestionId]Question) store {
	return &questionStore{
		questions: questions,
	}
}

func (qs *questionStore) contains(questionId QuestionId) (bool, error) {
	_, ok := qs.questions[questionId]
	return ok, nil
}

func (qs *questionStore) createQuestion(questionId QuestionId, question Question) error {
	if isExist, err := qs.contains(questionId); err != nil {
		return err
	} else if isExist {
		return errors.New("Question ID not unique")
	}
	qs.questions[questionId] = question
	return nil
}

func (qs *questionStore) getQuestion(questionId QuestionId) (IndexedQuestion, error) {
	if isExist, err := qs.contains(questionId); err != nil {
		return IndexedQuestion{}, err
	} else if !isExist {
		return IndexedQuestion{}, errors.New("Question does not exist")
	}
	question := qs.questions[questionId]
	return IndexedQuestion{questionId, question}, nil
}

func (qs *questionStore) getQuestions() ([]IndexedQuestion, error) {
	questionIds := maps.Keys(qs.questions)
	sort.Slice(questionIds, func(i, j int) bool {
		return questionIds[i] < questionIds[j]
	})

	res := make([]IndexedQuestion, 0, len(questionIds))
	for _, id := range questionIds {
		res = append(res, IndexedQuestion{id, qs.questions[id]})
	}
	return res, nil
}

func (qs *questionStore) updateQuestion(questionId QuestionId, question Question) error {
	if isExist, err := qs.contains(questionId); err != nil {
		return err
	} else if !isExist {
		return errors.New("Question does not exist")
	}
	qs.questions[questionId] = question
	return nil
}

func (qs *questionStore) deleteQuestion(questionId QuestionId) error {
	if isExist, err := qs.contains(questionId); err != nil {
		return err
	} else if !isExist {
		return errors.New("Question does not exist")
	}
	delete(qs.questions, questionId)
	return nil
}
