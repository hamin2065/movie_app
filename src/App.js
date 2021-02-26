import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data: 
          { movies }
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    // 첫번째는 state에서 온 movies이고 두 번째는 axios에서 온 movies이다.같은 movies이기 때문에 줄여서 { movies }라고 써준다.
    this.setState({ movies, isLoading: false });
  };
  componentDidMount(){
    this.getMovies(); 
  }

  render(){
    const { isLoading, movies } = this.state;
    return (
      <section className="loader">
        {isLoading ? (
          <div className="container">
              <span className="loader__text">Loading...</span>
            </div>
        ):(
          <div className="moveis">
            {movies.map(movie => (
              <Movie
                key = {movie.id}
                id = {movie.id}
                year = {movie.year}
                title = {movie.title}
                summary = {movie.summary}
                poster = {movie.medium_cover_image}
                genres = {movie.genres}
              />
            ))}
          </div>
          )}
      </section>
      );
    } 
  }

export default App;
