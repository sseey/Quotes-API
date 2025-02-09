from fastapi import FastAPI
from app.routes.quotes import router as quotes_router

app = FastAPI()

# Ajouter les routes
app.include_router(quotes_router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de citations !"}
