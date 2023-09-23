package main

import (
	"context"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type ApiServer struct {
	service Service
}

func NewApiServer(service Service) *ApiServer {
	return &ApiServer{
		service: service,
	}
}

func (api *ApiServer) QuestionCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idInUrl, err := strconv.Atoi(chi.URLParam(r, "questionId"))
		if err != nil {
			render.Render(w, r, ErrNotFound)
			return
		}
		questionId := QuestionId(idInUrl)
		ctx := context.WithValue(r.Context(), "questionId", questionId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (server *ApiServer) ListQuestions(w http.ResponseWriter, r *http.Request) {
	if questions, err := server.service.GetQuestions(r.Context()); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	} else if err := render.RenderList(w, r, NewQuestionListResponse(questions)); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
}

func (api *ApiServer) GetQuestion(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	questionId, ok := ctx.Value("questionId").(QuestionId)
	if !ok {
		render.Render(w, r, ErrRender(errors.New("Unexpected error")))
		return
	}
	question, err := api.service.GetQuestion(r.Context(), questionId)
	if err != nil {
		render.Render(w, r, ErrNotFound)
		return
	}
	if err := render.Render(w, r, &question); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
}

func (api *ApiServer) CreateQuestion(w http.ResponseWriter, r *http.Request) {
	data := &QuestionRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}
	question := Question{
		Information: *data.QuestionInformation,
		Details:     data.QuestionDetails,
	}

	questionId, err := api.service.CreateQuestion(r.Context(), question)
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
	question.Id = questionId
	render.Status(r, http.StatusCreated)
	if err := render.Render(w, r, &question); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
}

func (api *ApiServer) UpdateQuestion(w http.ResponseWriter, r *http.Request) {
	questionId, ok := r.Context().Value("questionId").(QuestionId)
	data := &QuestionRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}
	if !ok {
		render.Render(w, r, ErrRender(errors.New("Unexpected error")))
		return
	}
	question := Question{
		Id:          questionId,
		Information: *data.QuestionInformation,
		Details:     data.QuestionDetails,
	}
	if err := api.service.UpdateQuestion(r.Context(), question); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}

	render.Status(r, http.StatusOK)
	if err := render.Render(w, r, &question); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
}

func (api *ApiServer) DeleteQuestion(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	questionId, ok := ctx.Value("questionId").(QuestionId)
	println(questionId)

	if !ok {
		render.Render(w, r, ErrRender(errors.New("Unexpected error")))
		return
	}

	err := api.service.DeleteQuestion(r.Context(), questionId)
	if err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	render.Status(r, http.StatusOK)
	if err := render.Render(w, r, &Question{}); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
}

type ErrResponse struct {
	Err            error `json:"-"` // low-level runtime error
	HTTPStatusCode int   `json:"-"` // http response status code

	StatusText string `json:"status"`          // user-level status message
	AppCode    int64  `json:"code,omitempty"`  // application-specific error code
	ErrorText  string `json:"error,omitempty"` // application-level error message, for debugging
}

func (e *ErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

func ErrInvalidRequest(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 400,
		StatusText:     "Invalid request.",
		ErrorText:      err.Error(),
	}
}

func ErrRender(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Error rendering response.",
		ErrorText:      err.Error(),
	}
}

var ErrNotFound = &ErrResponse{HTTPStatusCode: 404, StatusText: "Resource not found."}

func (*Question) Render(w http.ResponseWriter, r *http.Request) error {
	// Pre-processing before a response is marshalled and sent across the wire
	return nil
}

type QuestionRequest struct {
	*QuestionInformation `json:"information"`
	QuestionDetails      `json:"details"`
}

func (qr *QuestionRequest) Bind(r *http.Request) error {
	if qr.QuestionInformation == nil {
		return errors.New("missing required Question field.")
	}

	if qr.QuestionInformation.Title == "" {
		return errors.New("missing required Question title field.")
	}

	return nil
}

func NewQuestionListResponse(questions []Question) []render.Renderer {
	list := []render.Renderer{}
	for i := range questions {
		list = append(list, &questions[i])
	}
	return list
}
