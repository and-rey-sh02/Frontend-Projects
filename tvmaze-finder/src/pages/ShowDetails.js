import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowById } from "../api/tvmaze";
import Loader from "../components/Loader";
import { useFavorites } from "../context/FavoritesContext";
import { FaStar } from "react-icons/fa";
import "./ShowDetails.css";

function ShowDetails() {
  const { id } = useParams();
  const controllerRef = useRef(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { state, dispatch } = useFavorites();
  const isFavorite = show && state.favorites.some((fav) => fav.id === show.id);

  const toggleFavorite = () => {
    if (!show) return;
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: show });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: show });
    }
  };

  useEffect(() => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError("");
    setShow(null);

    (async () => {
      try {
        const data = await getShowById(id, { signal: controller.signal });
        setShow(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load show");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  if (!show) return null;

  return (
    <div className="show-details">
      <Link to="/" className="back-link">← Back</Link>

      <div className="details-container">
        <div className="poster">
          <img
            src={show.image?.medium || "https://via.placeholder.com/300x450"}
            alt={show.name}
          />
          <button className="star-btn" onClick={toggleFavorite}>
            <FaStar color={isFavorite ? "orange" : "gray"} size={28} />
          </button>
        </div>

        <div className="info">
          <h1>{show.name}</h1>

          {show.genres?.length > 0 && (
            <p><b>Genres:</b> {show.genres.join(", ")}</p>
          )}

          {show.summary && (
            <div
              className="summary"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            />
          )}

          {show.officialSite && (
            <p>
              <a href={show.officialSite} target="_blank" rel="noreferrer">
                Official Site
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;