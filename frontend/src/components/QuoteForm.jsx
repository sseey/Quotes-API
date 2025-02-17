import { useState } from "react";

const QuoteForm = ({ onAddQuote }) => {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return; // Ne pas envoyer de citation vide

        const newQuote = {
            text,
            author: author.trim() || "Anonyme", // ✅ Ajoute l'auteur ou met "Anonyme" par défaut
        };

        console.log("Ajout de la citation :", newQuote); // ✅ Vérification dans la console

        try {
            const response = await fetch("http://localhost:8000/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newQuote),
            });

            if (!response.ok) throw new Error("Échec de l'ajout de la citation");

            setText(""); // ✅ Réinitialise le champ après ajout
            setAuthor(""); // ✅ Réinitialise aussi l’auteur
            onAddQuote(newQuote); // ✅ Met à jour la liste des citations
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="quote-form">
            {/* ✅ Zone de saisie principale */}
            <textarea
                className="quote-input"
                placeholder="Ajoute une citation épique..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* ✅ Champ Auteur en dessous */}
            <input
                type="text"
                className="author-input"
                placeholder="Auteur de la citation..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            {/* ✅ Bouton Ajouter */}
            <button type="submit" className="quote-button">
                ➕ Ajouter des citations
            </button>
        </form>
    );
};

export default QuoteForm;
