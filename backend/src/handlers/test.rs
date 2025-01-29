use actix_web::{web, HttpResponse};

pub async fn test_endpoint() -> HttpResponse {
    HttpResponse::Ok().json("Test endpoint works!")
} 