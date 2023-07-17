import React from "react";
import './MovieEdit.css'

function MovieEdit() {

  return(
    <div className="movie-edit-field">
      <h3>Add Movie</h3>
      <form>
        <label for='name'>Movie Title: </label>
        <input type='text' id='name' />
        <label for='release_date'>Release Date: </label>
        <input type='date' id='release_date'/>
      </form>
    </div>
  )
}

export default MovieEdit;