from fastapi import APIRouter, HTTPException
from app.database import conn, cursor
from app.redis_client import redis_client
from pydantic import BaseModel
import random

router = APIRouter()

# Modèle Pydantic
class Quote(BaseModel):
    text: str

@router.post("/quote")
def add_quote(quote: Quote):
    cursor.execute("INSERT INTO quotes (text) VALUES (%s) RETURNING id;", (quote.text,))
    conn.commit()
    redis_client.delete("random_quote")  # Invalider le cache
    return {"message": "Citation ajoutée !"}

@router.get("/quote/random")
def get_random_quote():
    cached_quote = redis_client.get("random_quote")
    if cached_quote:
        return {"text": cached_quote}
    
    cursor.execute("SELECT text FROM quotes ORDER BY RANDOM() LIMIT 1;")
    result = cursor.fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="Aucune citation trouvée.")
    
    quote_text = result[0]
    redis_client.set("random_quote", quote_text, ex=3600)  # Cache d'une heure
    return {"text": quote_text}

@router.get("/quotes")
def get_all_quotes():
    cursor.execute("SELECT text FROM quotes;")
    quotes = cursor.fetchall()
    return [{"text": q[0]} for q in quotes]

@router.delete("/quote/{quote_id}")
def delete_quote(quote_id: int):
    cursor.execute("DELETE FROM quotes WHERE id = %s RETURNING id;", (quote_id,))
    conn.commit()
    redis_client.delete("random_quote")  # Invalider le cache
    return {"message": "Citation supprimée"}
