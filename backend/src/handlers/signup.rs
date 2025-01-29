use actix_web::{web, HttpResponse};
use serde::Deserialize;
use bcrypt::{hash, DEFAULT_COST};
use sqlx::MySqlPool;

#[derive(Deserialize)]
pub struct SignupData {
    pub username: String,
    pub email: String,
    pub password: String,
}

pub async fn signup(
    form: web::Json<SignupData>,
    pool: web::Data<MySqlPool>,
) -> HttpResponse {
    let hashed_password = match hash(&form.password, DEFAULT_COST) {
        Ok(h) => h,
        Err(_) => return HttpResponse::InternalServerError().json("Password hashing failed"),
    };

    match sqlx::query!(
        r#"
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
        "#,
        form.username,
        form.email,
        hashed_password
    )
    .execute(pool.get_ref())
    .await
    {
        Ok(_) => {
            println!("User created successfully");
            HttpResponse::Ok().json("Signup successful")
        },
        Err(e) => {
            println!("Database error: {}", e);
            if e.to_string().contains("Duplicate entry") {
                HttpResponse::Conflict().json("Username or email already exists")
            } else {
                HttpResponse::InternalServerError().json("Database error")
            }
        }
    }
} 