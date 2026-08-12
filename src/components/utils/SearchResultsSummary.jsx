const SearchResultsSummary = ({ count, searchTerm }) => {

    return (
        searchTerm && <div className="search-results-text">
            {count > 0
                ? `Showing ${count} result${count > 1 ? "s" : ""} for "${searchTerm}"`
                : `No results found for "${searchTerm}"`}
        </div>
    );
};

export default SearchResultsSummary;