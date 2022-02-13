import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import MovieListHeading from "./MovieListHeading";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import MovieList from "./MovieList";
import SearchBox from "./SearchBox";
import AddFavorites from "./AddFavorites";
import RemoveFavorites from "./RemoveFavorites";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorites")!==null&&localStorage.getItem("favorites")!==undefined?JSON.parse(localStorage.getItem("favorites")):[]
  );
  const [movies, setMovies] = useState([]);

  const getMoviesRequest = async (myvalue) => {
    const url = `http://www.omdbapi.com/?s=${myvalue}&apikey=d2a7815b`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (jsonResponse.Search) {
      setMovies(jsonResponse.Search);
    }
  };

  const handleFavoritesClick = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (movie) => {
    const newFavories = favorites.filter((item) => {
      return item.imdbID !== movie.imdbID;
    });
    setFavorites(newFavories);
    localStorage.setItem("favorites",JSON.stringify(newFavories))
  };

  useEffect(() => {
    if(searchValue){
    let timer=setTimeout(()=>{
      getMoviesRequest(searchValue);
    },1000);

    return ()=>clearTimeout(timer);
  }
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox value={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavoritesClick={handleFavoritesClick}
          AddFavoritesComponent={AddFavorites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFromFavorites}
          AddFavoritesComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
}

export default App;
