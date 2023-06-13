import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
import Icon from "./icon.svg";

const API_URL = "https://www.omdbapi.com?apikey=202238b";

const App = () => {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(`Spiderman`);
  }, []);

  return (
    <div className="app">
      <div className="icon">
        <img src={Icon} alt="logo" />
        <h1>Popcorn Time</h1>
      </div>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
