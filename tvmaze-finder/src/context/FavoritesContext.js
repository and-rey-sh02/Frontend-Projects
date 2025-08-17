import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  favorites: [],
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (show) => show.id !== action.payload.id
        ),
      };
    case "LOAD_FROM_STORAGE":
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}

function init(initialState) {
  const saved = localStorage.getItem("favorites");
  return saved ? { favorites: JSON.parse(saved) } : initialState;
}

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [state, dispatch] = useReducer(favoritesReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }, [state.favorites]);

    return (
      <FavoritesContext.Provider value={{ state, dispatch }}>
        {children}
      </FavoritesContext.Provider>
    );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}