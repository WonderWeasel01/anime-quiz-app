mod routes;
mod handlers;
mod db;

use actix_web::{web, App, HttpServer, http};
use routes::auth::auth_routes;
use dotenv::dotenv;
use actix_cors::Cors;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    
    let pool = db::db::create_pool().await.expect("Failed to create pool");
    db::db::test_connection(&pool).await.expect("Failed to test connection");

    println!("Server is starting...");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
            .configure(auth_routes)
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
} 