import React, { PureComponent } from 'react';
import Movie from './Movie';
import styled from  'styled-components';

class MoviesList extends PureComponent {

  state = {
    movies: []
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=12e9e2de03ebd1a7c3cfa3857fde0e3f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
      const movies = await res.json();
      this.setState({
        movies: movies.results
      })
    }
    catch(error) {
      console.warn(error);
    }
  }

  render() {
    return (
      <MovieGrid>
        {this.state.movies.map((movie) => <Movie movie={movie} desc={movie.overview} key={movie.id} /> )}
      </MovieGrid>
    )
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
