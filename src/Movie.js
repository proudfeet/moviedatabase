import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from  'styled-components';
import Overdrive from 'react-overdrive';

// *********
// Before converting to a functional stateless component
// We don't really need all this code since all this component does is simply render some data
// *********
// export default class Movie extends Component {
//   // Using proptypes (which is a node package we have to install) is a way of detailing what props will make an appearance in your component
//   // You can also detail default prop types in the case that a proptype has not been passed for a given component
//   // `static` refers to the fact that the propTypes will not change  
//   static propTypes = {
//     // The line below simply tells our applicaiton that we are expecting a movie prop of the type object
//     // movie: PropTypes.object
//     // If we were to use the line below, we would have errors in the console due to the fact that the movie prop being passed in is an object, and not a string
//     // movie: PropTypes.string
//     // Even better than using PropTypes.object is using PropTypes.shape, as it allows us to get more granular about what keys and value types the prop being passed in will have
//     // The isRequired is exactly what it sounds like: it makes it so that the compiler will throw an error if that particular prop is not passed in
//     movie: PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       // desc: PropTypes.string
//     }),
//     // We have moved
//     desc: PropTypes.string
//   }
  

//   // defaultProps are exactly what they sound like: a way for your to have a default value for a given prop if it is not passed into the component
//   // One of the central problems of defaultProps, however, is that we are not able to assign defaultProps to a nested prop (like description)
//   // As a result, we need to move it outside of the movie PropType.shape and have it as it's own PropType, and also pass it in explicitly as a prop in the parent component
//   static defaultProps = {
//     // THIS WOULD NOT WORK
//     // movie: PropTypes.shape({
//     //   desc: 'Description not available'
//     // })
//     desc: 'Description not available'
//   }

//   render() {
//     return (
//       <div>
//       {/* Without the key attribute on the div, React will complain in the console that you need it. */}
//       {/* You need it because React needs a way to keep track of the items in an array */}
//       {/* In our case, it makes sense to use the ID of each movie as this key attribute, since every movie has a (hopefully) unique ID */}
//         <h3>{this.props.movie.title}</h3>
//         {/* The below line was necessary when desc was a sub-prop of the movie prop, but since it is being passed in as it's own prop, we use the next line down */}
//         {/* <p>{this.props.movie.desc}</p> */}
//         <p>{this.props.desc}</p>
//       </div>
//     )
//   }
// }

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
// Again, because this only returns the Movie component, we're going to define Movie as a function that implicitly returns the markup for the movie
// The prop from the parent component is passed in as `movie` (and destructured using the {} syntax) and then used to populate the Movie component
const Movie = ({ movie }) => (
  // Using the movie.id prop allows us to dynamically link to each movie
  <Link to={`${movie.id}`}>
    {/* Overdrive is React component installed from NPM, it requires a unique ID on the components that you are transitioning in both states (i.e. beginning and finished state) */}
    <Overdrive id={movie.id}>
      <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title}/>
    </Overdrive>
  </Link>
);

// We have this line down here (after the function definition) because in JavaScript, we cannot export a function definition
export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

// This is an example of a styled component, where the CSS is written in the JS for the component
export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;