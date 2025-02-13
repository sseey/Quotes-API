import { useState } from "react";

const QuoteForm = ({ onAddQuote }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddQuote(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="quote-form">
            <textarea
                className="quote-input"
                placeholder="Ajoute une citation épique..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="quote-button">
                Ajouter
            </button>
        </form>
    );
};

export default QuoteForm;
