use actix_cors::Cors;
use actix_web::{web, App, HttpServer, HttpResponse, Error, middleware::Logger};
use serde::Deserialize;
use serde_json::json;
use log::{info, error};
use trustcaptcha_rust::captcha_manager::CaptchaManager;

#[derive(Deserialize, Debug)]
struct VerificationRequest {
    #[serde(rename = "verificationToken")]
    verification_token: String,
}

async fn post_api_example(verification_request: web::Json<VerificationRequest>) -> Result<HttpResponse, Error> {
    info!("Received request: {:?}", verification_request);

    let secret_key = "<your_secret_key>";
    let verification_token = &verification_request.verification_token; // Verwendung des korrekten Schlüssels

    // Retrieving the verification result
    let verification_result = match CaptchaManager::get_verification_result(secret_key, verification_token).await {
        Ok(result) => result,
        Err(e) => {
            // Fetch verification result failed - handle error
            error!("Failed to fetch verification result: {}", e);
            return Ok(HttpResponse::InternalServerError().json(json!({"error": "Captcha verification failed"})));
        }
    };

    // Do something with the verification result
    if !verification_result.verification_passed || verification_result.score > 0.5 {
        info!("Verification failed, or bot score is higher than 0.5 – this could indicate a bot.");
    }

    Ok(HttpResponse::Ok().json(verification_result))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init(); // Initialize the logger

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(Logger::default()) // Add Logger middleware
            .route("/api/example", web::post().to(post_api_example))
    })
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
