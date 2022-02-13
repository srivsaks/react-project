import React from "react";
const MovieList=({movies,handleFavoritesClick,AddFavoritesComponent})=>{
    return(
        <div>
            {movies.map((movie,index)=>{
                return (<div className="image-container d-flex justify-content-start m3">
                    <img src={movie.Poster} alt="movie"/>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                    {/* <AddFavoritesComponent/> */}
                    <AddFavoritesComponent handleClick={handleFavoritesClick} movie={movie}/>
                    </div>
                </div>)
            })}
        </div>
    )

}
export default MovieList;
