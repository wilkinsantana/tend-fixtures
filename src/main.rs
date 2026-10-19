use axum::{response::Html, routing::get, Router};

#[tokio::main]
async fn main() {
    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".into());
    let msg = std::env::var("FIXTURE_MESSAGE").unwrap_or_else(|_| "(unset)".into());
    let app = Router::new()
        .route("/health", get(|| async { "ok" }))
        .route("/", get(move || {
            let msg = msg.clone();
            async move { Html(format!("<h1>fixture rust-axum OK</h1><p>message: {msg}</p>")) }
        }));
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{port}")).await.unwrap();
    println!("fixture rust-axum listening on {port}");
    axum::serve(listener, app).await.unwrap();
}
