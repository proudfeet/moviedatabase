import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

// This is our first component that we created as an example of the things you can do in React
// Feel free to un-commment it out if you want to play around with it
// class App extends Component {

//   // The constructor is called when a component is first created
//   // Props of the component are not immediately available to the constructor unless they are passed in explicitly
//   // constructor(props) {
//   //   super(props);
//   //   console.log("constructor");
//   // }

//   // This is fired BEFORE the component gets rendered/mounted
//   // At this point, we will have access to `this`, because `this` has been created
//   // componentWillMount() {
//   //   console.log("will mount");
//   // }

//   // This is fired right AFTER the component gets rendered/mounted
//   // componentDidMount() {
//   //   console.log("did mount");
//   // }

//   state = {
//     toggle: true,
//     input: 'Hello'
//   }

//   toggle = () => {
//     this.setState({
//       toggle: !this.state.toggle
//     })
//   }

//   updateInput = (event) => {
//     this.setState({
//       input: event.target.value
//     })
//   }

//   submit = () => {
//     console.log(this.text);
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <Welcome text="Welcome to using props"/>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//           {/* {
//             this.state.toggle &&
//             <p>This should show and hide</p>
//           } */}
//           {/* <button onClick={this.toggle}>Show/Hide</button> */}
//           <input type="text" ref={(input) => this.text = input}/>
//           {/* Note: the ref line is simply an arrow function that takes in the text input in as a param */}
//           {/* From there, we assign the `text` field of the App component (which we also create by using this line) to the input itself */}
//           {/* To confirm this, we can log this.text in the componentDidMount method */}
//           <input type="text" onChange={this.updateInput} value={this.state.input}/>
//           {/* We don't need to pass anything into updateInput in this case, because we will have access to the event, which we can then use to get the value of the input */}
//           <button onClick={this.submit}>Show Value</button>
//         </header>
//       </div>
//     );
//   }
// }

// class Welcome extends Component {
//   render() {
//     const { text } = this.props;
//     return (
//       <h1 className="App-title">{text}</h1>
//     );
//   }
// }

// const movies = [
//   {
//     id: 1,
//     title: 'Star Wars',
//     desc: 'A movie about star stuff'
//   },
//   {
//     id: 2,
//     title: 'Spiderman'
//   },
//   {
//     id: 3,
//     title: 'Sound City'
//   },
//   {
//     id: 4,
//     title: 'Goodwill Hunting'
//   },
//   {
//     id: 5,
//     title: 'Blade Runner'
//   },
// ];

class App extends Component {

  // This is our default state for this component (in this case, the component is our entire app, so it is essentially the state for our application)
  // In this case, this will be updated in the componentDidMount method
  state = {
    movies: []
  }

  // Here, we're going to use the componentDidMount lifecycle method as opposed to the constructor or componentWillMount method to fetch data from our API
  // The reason for this is that if we put it in one of the two methods above, our UI won't render at all until that data is returned
  // This is problematic because when we're waiting for the data to return, it could take a few seconds (during which nothing will be loaded), which isn't a good user experience
  async componentDidMount() {
    // The async keyword before the function allows us to run an asynchronos function, and also to await values within it (useful for situations where we have a result that we need to wait to return from somewhere, like an API)
    // With async functions, it's a good idea to try { whatever code you want to happen } catch { catch here in case of errors }
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=12e9e2de03ebd1a7c3cfa3857fde0e3f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch(error) {
      console.warn(error);
    }
  }

  render() {
    console.log(this.state.movies);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.state.movies.map((movie) => 
          <Movie movie={movie} desc={movie.overview} key={movie.id} />
        )}
      </div>
    )
  }
}

export default App;
