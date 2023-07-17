import React from "react";
import { useEffect, useState } from "react";
import './Home.css'

function Home() {
  const [movieList, setMovieList] = useState();

  useEffect(() => {
    async function grabMovies () {
      const response = await fetch('http://localhost:8080/movies');
      setMovieList(await response.json())
    }
    
    grabMovies();
  }, [])

  return (
    <div className="movie-list">
        {
          movieList?.map((movie) => <div className="movie-item" key={movie.id}>{movie.title}</div>)
        }
    </div>
  )
}

export default Home;