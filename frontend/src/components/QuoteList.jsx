const QuoteList = ({ quotes, onDeleteQuote }) => {
    return (
        <div className="mt-8 space-y-4">
            {quotes.map((quote, index) => (
                <section key={index} className="component bg-black p-10 mx-1 md:mx-10">
                    <blockquote className="relative text-white text-center p-10 w-full m-1">
                        "{quote}"
                        <cite> - Anonyme</cite>
                    </blockquote>
                    <button
                        onClick={() => onDeleteQuote(index)}
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        ❌ Supprimer
                    </button>
                </section>
            ))}
        </div>
    );
};

export default QuoteList;
