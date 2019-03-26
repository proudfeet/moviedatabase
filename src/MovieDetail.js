import React, { Component } from 'react';
import { Poster } from './Movie';
import styled from  'styled-components';
import Overdrive from 'react-overdrive';

class MoviesList extends Component {

  state = {
    movie: {}
  }

  async componentDidMount() {
    try {
      // NOTE: note that the props for this come from the Route component that we are using to display this
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=12e9e2de03ebd1a7c3cfa3857fde0e3f&language=en-US`)
      const movie = await res.json();
      this.setState({
        movie,
      })
    }
    catch(error) {
      console.warn(error);
    }
  }

  render() {
    const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
    const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`} >
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title}/>
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    )
  }
}

export default MoviesList;

// More styled components
const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  background-position-x: 50%;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;

  > div {
    margin-left: 20px;
  }

  img {
    position: relative;
    top: -5rem;
  }
`;
