package main

type Question struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Complexity  Category `json:"complexity"`
	Categories  []string `json:"categories"`
}

type IndexedQuestion struct {
	Id       QuestionId `json:"id"`
	Question Question   `json:"question"`
}

type QuestionId uint64

type Category int

const (
	Easy   Category = 0
	Medium          = 1
	Hard            = 2
)
