package main

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/guregu/dynamo"
)

func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Add("Access-Control-Allow-Origin", "*")
        w.Header().Add("Access-Control-Allow-Credentials", "true")
        w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

        if r.Method == "OPTIONS" {
            http.Error(w, "No Content", http.StatusNoContent)
            return
        }

        next.ServeHTTP(w, r)
    })
}


func main() {

	accessKey := os.Getenv("AWS_PREPPAL_PUBLIC_KEY")
	secretKey := os.Getenv("AWS_PREPPAL_PRIVATE_KEY")
	session := session.Must(session.NewSession())
	db := dynamo.New(session, &aws.Config{
		Region:      aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(accessKey, secretKey, ""),
	})

	descriptionTable := db.Table("questionDetails")

	pgxDb, err := pgx.Connect(context.Background(), os.Getenv("POSTGRES_URL"))
	if err != nil {
		log.Fatal(fmt.Sprintf("Unable to connect to database: %v\n", err))
	}

	store := NewQuestionStore(descriptionTable, pgxDb)
	service := NewQuestionService(store)
	server := NewApiServer(service)

	r := chi.NewRouter()

	r.Use(CORS)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello world"))
	})
	r.Route("/questions", func(r chi.Router) {
		r.Post("/", server.CreateQuestion)
		r.Get("/", server.ListQuestions)
		r.Route("/{questionId}", func(r chi.Router) {
			r.Use(server.QuestionCtx)
			r.Get("/", server.GetQuestion)
			r.Put("/", server.UpdateQuestion)
			r.Delete("/", server.DeleteQuestion)
		})
	})

	err = http.ListenAndServe(":3333", r)
	if err != nil {
		log.Fatal(err)
	}

}
