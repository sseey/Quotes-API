from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.quotes import router as quotes_router

app = FastAPI()

# ✅ Ajout du middleware CORS pour autoriser les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Remplace "*" par ["http://localhost:5173"] si tu veux limiter au frontend
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes HTTP (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Autorise tous les headers
)

# Ajouter les routes
app.include_router(quotes_router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de citations !"}
