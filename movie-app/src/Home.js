import React from "react";
import { useEffect, useState } from "react";
import './Home.css'
import Header from "./Header";
import { createContext } from "react";

function Home() {
  const [movieList, setMovieList] = useState();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function grabMovies () {
      const response = await fetch('http://localhost:8080/movies');
      setMovieList(await response.json())
    }
    
    grabMovies();
  }, [refresh])

  return (
    <>
      <Header 
        movieList={movieList}
        setMovieList={setMovieList}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <div className="movie-list">
        {
          movieList?.map((movie) => <div className="movie-item" key={movie.id}>{movie.title}</div>)
        }
      </div>
    </>
  )
}

export default Home;