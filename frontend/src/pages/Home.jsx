import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import QuoteForm from "../components/QuoteForm";

const Home = () => {
    const [quotes, setQuotes] = useState(["Un Anneau pour les gouverner tous..."]);
    const [randomQuote, setRandomQuote] = useState(quotes[0]);

    useEffect(() => {
        setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [quotes]);

    const addQuote = (quote) => setQuotes([...quotes, quote]);

    return (
        <div className="quote-container">
            <QuoteCard quote={randomQuote} />
            <QuoteForm onAddQuote={addQuote} />
        </div>
    );
};

export default Home;
