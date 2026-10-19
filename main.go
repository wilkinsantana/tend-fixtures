package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	id := "go-http"
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	msg := os.Getenv("FIXTURE_MESSAGE")
	if msg == "" {
		msg = "(unset)"
	}
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "ok") })
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "<h1>fixture %s OK</h1><p>message: %s</p>", id, msg)
	})
	log.Printf("fixture %s listening on %s message=%s", id, port, msg)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
