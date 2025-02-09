import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()  # Charger les variables d'environnement depuis .env

DATABASE_URL = os.getenv("DATABASE_URL", "dbname=quotes_db user=postgres password=password host=db port=5432")

conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()
