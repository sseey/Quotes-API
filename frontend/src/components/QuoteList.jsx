const QuoteList = ({ quotes, onDeleteQuote, showQuotes }) => {
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/quote/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de la citation");
            }

            // ✅ Rafraîchir les citations après suppression
            onDeleteQuote();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <div className={`quote-list-container ${showQuotes ? "visible" : "hidden"}`}>
            {quotes.length === 0 ? (
                showQuotes && <p className="text-gray-400 text-center">Aucune citation enregistrée.</p>
            ) : (
                quotes.map((quote, index) => (
                    <section 
                        key={quote.id} 
                        className="component bg-black p-6 mx-1 md:mx-10 flex flex-col items-center justify-center text-center relative rounded-lg quote-item fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* ✅ Citation bien centrée */}
                        <blockquote className="quote-text">
                            "{quote.text}"
                        </blockquote>

                        {/* ✅ Auteur centré sous la citation */}
                        <cite className="quote-author">
                            - {quote.author}
                        </cite>

                        {/* ✅ Bouton Supprimer bien aligné à droite */}
                        <button
                            onClick={() => handleDelete(quote.id)}
                            className="delete-button"
                        >
                            ❌
                        </button>
                    </section>
                ))
            )}
        </div>
    );
};

export default QuoteList;
