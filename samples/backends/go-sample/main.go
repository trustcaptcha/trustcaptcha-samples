package main

import (
	"encoding/json"
	"fmt"
	"github.com/trustcaptcha/go-library"
	"log"
	"net/http"
)

type VerificationRequest struct {
	VerificationToken string `json:"verificationToken"`
}

func postApiExample(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req VerificationRequest

	// Parse the request body
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Retrieving the verification result
	verificationResult, err := trustcaptcha.GetVerificationResult("<your_secret_key>", req.VerificationToken)
	if err != nil {
		log.Printf("Failed to fetch verification result: %v", err)
		http.Error(w, "Captcha verification failed", http.StatusInternalServerError)
		return
	}

	// Do something with the verification result
	if !verificationResult.VerificationPassed || verificationResult.Score > 0.5 {
		log.Println("Verification failed or bot score > 0.5 – possible automated request.")
	}

	// Send the verification result as response
	if err := json.NewEncoder(w).Encode(verificationResult); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/api/example", postApiExample)
	fmt.Println("Server is running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("could not listen on port 8080 %v", err)
	}
}
