import React, { Component } from 'react';
import './App.css';
import Movie from '../movie';

class App extends Component {

  state = {
  }

  componentDidMount () {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie 
        title={movie.display_title} 
        poster={movie.multimedia.src}
        link={movie.link.url}
        key={index} 
        genres={movie.headline}
        synopsis={movie.summary_short} />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=MGYGHDV4asweN8ac8wSIGYDd9L2ZXaPU')
    .then(response => response.json())
    .then(json => json.results) // arrow function(=>) return 기능 내장
    .catch(err => console.log(err)) // .catch(function(err) { console.log(err) })
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
