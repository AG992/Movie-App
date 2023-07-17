import React from "react";

const movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];

function App() {
  return (
    <div>
      <ui>
        {
          movies.map((movie) => <li>{movie.title}</li>)}
      </ui>
    </div>
  )
}

export default App;