import { useState } from "react";
import "./SearchBar.css";

function SearchBar({onSearch, loading}) {
    const [query, setQuery] = useState("");

    const handleSubmit  = (e) => {
        e.preventDefault();
        const q = query.trim();
        if (q) onSearch(q);
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input 
                className="search-input"
                type="text"
                placeholder="Search shows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
            />
            <button className="search-button" type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}

export default SearchBar;