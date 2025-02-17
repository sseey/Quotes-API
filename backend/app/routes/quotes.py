from fastapi import APIRouter, HTTPException
from app.database import conn, cursor
from app.redis_client import redis_client
from pydantic import BaseModel

router = APIRouter()

# ✅ Modèle Pydantic avec l'auteur
class Quote(BaseModel):
    text: str
    author: str = "Anonyme"  # Si l'auteur n'est pas renseigné, on met "Anonyme" par défaut

# ✅ Vérification et création de la table si elle n'existe pas
def ensure_table_exists():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quotes (
            id SERIAL PRIMARY KEY,
            text TEXT NOT NULL,
            author TEXT DEFAULT 'Anonyme'
        );
    """)
    conn.commit()

ensure_table_exists()  # ✅ Vérifie que la table existe au démarrage

# ✅ Ajouter une citation
@router.post("/quote")
def add_quote(quote: Quote):
    try:
        cursor.execute(
            "INSERT INTO quotes (text, author) VALUES (%s, %s) RETURNING id;", 
            (quote.text, quote.author)
        )
        conn.commit()
        redis_client.delete("random_quote")  # Invalider le cache
        return {"message": "Citation ajoutée !"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'ajout de la citation : {str(e)}")

# ✅ Récupérer toutes les citations
@router.get("/quotes")
def get_all_quotes():
    try:
        cursor.execute("SELECT id, text, author FROM quotes;")  # ✅ On récupère aussi l'auteur
        quotes = cursor.fetchall()
        return [
            {"id": q[0], "text": q[1], "author": q[2] if q[2] else "Anonyme"} 
            for q in quotes
        ]  # ✅ Gestion du cas où l'auteur est vide
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des citations : {str(e)}")

# ✅ Récupérer une citation aléatoire
@router.get("/quote/random")
def get_random_quote():
    try:
        cached_quote = redis_client.get("random_quote")
        if cached_quote:
            return {"text": cached_quote}

        cursor.execute("SELECT text, author FROM quotes ORDER BY RANDOM() LIMIT 1;")
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="Aucune citation trouvée.")

        quote_text, quote_author = result
        redis_client.set("random_quote", f"{quote_text} - {quote_author}", ex=3600)  # Cache d'une heure
        return {"text": quote_text, "author": quote_author}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de la citation aléatoire : {str(e)}")

# ✅ Supprimer une citation par ID
@router.delete("/quote/{quote_id}")
def delete_quote(quote_id: int):
    try:
        cursor.execute("DELETE FROM quotes WHERE id = %s RETURNING id;", (quote_id,))
        deleted_id = cursor.fetchone()
        if deleted_id is None:
            raise HTTPException(status_code=404, detail="Citation non trouvée.")

        conn.commit()
        redis_client.delete("random_quote")  # Invalider le cache
        return {"message": "Citation supprimée"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression de la citation : {str(e)}")
