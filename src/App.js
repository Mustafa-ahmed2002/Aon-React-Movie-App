import { useEffect, useState } from "react";
import Api from "./components/Movie";

const API_MAIN =
  "https://api.themoviedb.org/3/discover/movie?api_key=281b30700b4120396836ee38ef1738f5";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmNjMWM2MjE2MzI5NzRiYmRkNTg3NzlmNzRiY2Q3YyIsInN1YiI6IjY1NTM1YmExZWE4NGM3MTA5NmRjMmUxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxOfcIS1lQ_Ghw-YWRzwpy_YRtb2YbVdTQ6JNa-VJig",
  },
};

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchterm] = useState("");

  const loadData = async () => {
    let resp = await fetch(API_MAIN, options);
    let data = await resp.json();
    setMovies(data.results);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let resp = await fetch(SEARCH_API + "&query=" + searchTerm, options);
    let data = await resp.json();

    setMovies(data.results);
    setSearchterm("");
  };

  const changeHandler = (e) => {
    setSearchterm(e.target.value);
  };
  const clickHandler = async () => {
    let resp = await fetch(API_MAIN, options);
    let data = await resp.json();

    setMovies(data.results);
  };
  return (
    <>
      <div className="home">
        <button onClick={clickHandler}>Home</button>

        <form onSubmit={handleOnSubmit}>
          <header className="search">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={changeHandler}
            />
          </header>
        </form>
      </div>
      <div className="movie-container">
        {movies.map((movie) => (
          <Api key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
