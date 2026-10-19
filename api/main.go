package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("FATAL: DATABASE_URL is required (built from DB_PASSWORD in compose)")
	}
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}
	for i := 0; ; i++ {
		if err = db.Ping(); err == nil {
			break
		}
		if i > 30 {
			log.Fatalf("database unreachable: %v", err)
		}
		time.Sleep(time.Second)
	}
	if _, err := db.Exec(`CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, at TIMESTAMPTZ NOT NULL DEFAULT now())`); err != nil {
		log.Fatal(err)
	}
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		if err := db.Ping(); err != nil {
			http.Error(w, "db down", 503)
			return
		}
		fmt.Fprint(w, "ok")
	})
	http.HandleFunc("/visit", func(w http.ResponseWriter, r *http.Request) {
		var n int
		if _, err := db.Exec(`INSERT INTO visits DEFAULT VALUES`); err == nil {
			err = db.QueryRow(`SELECT count(*) FROM visits`).Scan(&n)
		}
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		json.NewEncoder(w).Encode(map[string]int{"count": n})
	})
	log.Println("fixture compose-web-api-db api on 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
