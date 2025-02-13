const QuoteCard = ({ quote }) => {
    return (
        <div className="quote-card">
            <h5 className="citation-title">Citation Aléatoire</h5>
            <p className="citation-text">"{quote}"</p>
        </div>
    );
};

export default QuoteCard;
