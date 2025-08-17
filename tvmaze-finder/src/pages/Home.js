import { useCallback, useRef, useState } from "react";
import { searchShows } from "../api/tvmaze";
import SearchBar from "../components/SearchBar";
import ShowCard from "../components/ShowCard";
import Loader from "../components/Loader";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const lastControllerRef = useRef(null);

    const handleSearch = useCallback(async (query) => {
        if(lastControllerRef.current) {
            lastControllerRef.current.abort();
        }
        const controller = new AbortController();
        lastControllerRef.current = controller;

        setLoading(true);
        setError("");
        setShows([]);

        try {
            const data = await searchShows(query, { signal: controller.signal });

            const list = data.map((item) => item.show);
            setShows(list);
        } catch(err) {
            if(err.name !== "AbortError") {
                setError(err.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="home">
            <h1>TVMaze Finder</h1>  

            <div className="search-header">
                <SearchBar onSearch={handleSearch} loading={loading} />
                <Link to="/favorites" className="favorites-link" title="Избранное">
                    <FaBookmark size={32} color="orange" />
                </Link>
             </div>             

            {loading && <Loader />}
            {error && <div role="alert" style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}
            {!loading && !error && shows.length === 0 && (
                <p>Начни с поиска, например: <em>friends</em> или <em>breaking bad</em>.</p>
            )}

            <div className="shows-grid">
                {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </div>
    );
}

export default Home;