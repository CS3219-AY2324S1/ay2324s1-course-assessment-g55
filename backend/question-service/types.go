package main

import "time"

type QuestionInformation struct {
	Title      string     `json:"title"`
	Complexity Complexity `json:"complexity"`
	Categories []string   `json:"categories"`
	Attempts   int        `json:"attempts"`
	CreatedAt  time.Time  `json:"createdAt"`
}

type QuestionDetails struct {
	Description string `json:"description"`
}

type Question struct {
	Id          QuestionId          `json:"id"`
	Information QuestionInformation `json:"information"`
	Details     QuestionDetails     `json:"details"`
}

type AwsQuestionDetail struct {
	Id          QuestionId `dynamo:"questionId"`
	Description string     `dynamo:"description"`
}

type PgQuestionInformation struct {
	Id         QuestionId `db:"questionId"`
	Title      string     `db:"questionTitle"`
	Complexity Complexity `db:"difficulty"`
	Categories []string   `db:"categories"`
	Attempts   int        `db:"attempts"`
	CreatedAt  time.Time  `db:"createdAt"`
}

type QuestionId uint64

type Complexity string

const (
	Easy   Complexity = "easy"
	Medium            = "medium"
	Hard              = "hard"
)
