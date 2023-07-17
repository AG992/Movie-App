import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";


function Header({movieList, setMovieList, refresh, setRefresh}) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  
  return (
    <div class="topnav">
      <Link to='/' onClick={() => {
        setRefresh(!refresh);
        navigate('/');
      }}>Home</Link>
      <input type="text" placeholder="Search.." onChange={(e) => {
        setSearchTerm(e.target.value);
      }}/>
      <input type='submit' onClick={() => {
        const filteredMovies = movieList.filter(movie => movie.title.includes(searchTerm));
        console.log(filteredMovies);
        setMovieList(filteredMovies);
      }}/>
    </div>
  )
}

export default Header;
