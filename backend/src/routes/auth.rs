use actix_web::web;
use crate::handlers::{signup, test};

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/auth")
            .route("/signup", web::post().to(signup::signup))
            .route("/test", web::get().to(test::test_endpoint))
    );
} 