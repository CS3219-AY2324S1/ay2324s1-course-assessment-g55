package main

import (
	"context"
)

type Service interface {
	CreateQuestion(context.Context, Question) (QuestionId, error)
	GetQuestion(context.Context, QuestionId) (Question, error)
	GetQuestions(context.Context) ([]Question, error)
	UpdateQuestion(context.Context, Question) error
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

func (s *QuestionService) CreateQuestion(ctx context.Context, question Question) (QuestionId, error) {
	return s.questions.createQuestion(question)
}

func (s *QuestionService) GetQuestion(ctx context.Context, questionId QuestionId) (Question, error) {
	return s.questions.getQuestion(questionId)
}

func (s *QuestionService) GetQuestions(context.Context) ([]Question, error) {
	return s.questions.getQuestions()
}

func (s *QuestionService) UpdateQuestion(ctx context.Context, question Question) error {
	return s.questions.updateQuestion(question)
}

func (s *QuestionService) DeleteQuestion(ctx context.Context, questionId QuestionId) error {
	return s.questions.deleteQuestion(questionId)
}
