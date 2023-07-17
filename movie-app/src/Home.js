import React from "react";
import { useEffect, useState } from "react";
import './Home.css'
import Header from "./Header";

function Home() {
  const [movieList, setMovieList] = useState([]);
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
          movieList.length ? movieList.map((movie) => 
            <div className="movie-item" key={movie.id}>
              {'Title: ' + movie.title + '\n'}
              {'Release Date: ' + movie.release_date}
            </div>)
            : <div className="movie-item">No movies match your search!</div>
        }
      </div>
    </>
  )
}

export default Home;