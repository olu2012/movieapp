import React, {Component} from 'react';
import axios from 'axios';
import { API_KEY,API_URL,IMAGE_BASE_URL,POSTER_SIZE } from './config';
class Movies extends Component {
    state = {
      movies: []
    };
  
    async componentDidMount() {
        
      const { data: movies } = await axios.get(
        API_URL+ "discover/movie?sort_by=popularity.desc&api_key=" + API_KEY
      );
      this.setState({ movies: movies.results });
    }
  
    render() {
       
      console.log(this.state.movies);
      return (
          
        <div className="container">
          {this.state.movies.map(movie =>
          <div>
          <h1 key={movie.id}>{movie.title}</h1>
          
    
    <img key={movie.title} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}></img>
       </div>
        
         
         )}
        //</div>
       
      );
    }
  }
  export default Movies;