import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import QuoteForm from "../components/QuoteForm";
import QuoteList from "../components/QuoteList";

const Home = () => {
    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showQuotes, setShowQuotes] = useState(false); // ✅ Caché par défaut

    const fetchQuotes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/quotes");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des citations");
            }
            const data = await response.json();
            setQuotes(data);

            if (data.length > 0) {
                setRandomQuote(data[Math.floor(Math.random() * data.length)].text);
            } else {
                setRandomQuote("Aucune citation enregistrée.");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des citations :", error);
        }
        setIsLoading(false);
    };

    const addQuote = async (quoteText, quoteAuthor) => {
        try {
            const response = await fetch("http://localhost:8000/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: quoteText, author: quoteAuthor }),
            });
            if (response.ok) {
                fetchQuotes(); // Recharge les citations sans recharger la page
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la citation :", error);
        }
    };

    const toggleShowQuotes = () => {
        if (!showQuotes) {
            setTimeout(fetchQuotes, 300); // ✅ Charge les citations après l'affichage
        }
        setShowQuotes(!showQuotes);
    };

    return (
        <div className="quote-container">
            <QuoteCard quote={randomQuote} />
            <QuoteForm onAddQuote={addQuote} />

            {/* ✅ Bouton qui affiche et masque les citations */}
            <button
                onClick={toggleShowQuotes}
                className="quote-button mt-4"
                disabled={isLoading}
            >
                {isLoading ? "Chargement..." : showQuotes ? "❌ Masquer les Citations" : "📜 Afficher les Citations"}
            </button>

            {/* ✅ Condition pour supprimer complètement le conteneur */}
            {showQuotes && (
                <div className="quote-list-container transition-all duration-500 opacity-100 max-h-96">
                    <QuoteList quotes={quotes} onDeleteQuote={fetchQuotes} showQuotes={showQuotes} />
                </div>
            )}
        </div>
    );
};

export default Home;
