import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { FaStar } from "react-icons/fa";
import "./ShowCard.css";

function ShowCard({ show }) {
    const { state, dispatch } = useFavorites();

    const isFavorite = state.favorites.some((fav) => fav.id === show.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: show });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: show });
        }
    };

    return (
        <div className="show-card">

             <div className="poster">
                <img
                src={show.image?.medium || "https://via.placeholder.com/210x295"}
                alt={show.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/210x295")}
                />
            </div>

            <h3>{show.name}</h3>
            <div className="actions">
                <button className="star-btn" onClick={toggleFavorite}>
                    <FaStar color={isFavorite ? "orange" : "gray"} size={24}  className={isFavorite ? "active" : ""} />
                </button>
                <Link to={`/show/${show.id}`} className="details-link">
                    Details
                </Link>
            </div>
        </div>
    );
}

export default ShowCard;