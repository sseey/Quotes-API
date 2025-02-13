# app/database.py
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "dbname=quotes_db user=postgres password=password host=db port=5432")

# Connexion à la base de données
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Création de la table si elle n'existe pas
cursor.execute("""
    CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL
    )
""")
conn.commit()
