import React, { useContext } from "react";
import { useFavorites } from "../context/FavoritesContext";
import ShowCard from "../components/ShowCard";
import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
  const { state } = useFavorites();

  if (state.favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <Link to="/" className="back-link">← Back</Link>
        <h2>У вас пока нет избранных сериалов 🙂</h2>
        <p>Начните добавлять сериалы в избранное, чтобы они здесь появились!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Link to="/" className="back-link">← Back</Link>
      <h1>Избранные сериалы</h1>
      <div className="shows-grid">
        {state.favorites.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;