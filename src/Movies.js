import React, {Component} from 'react';
import axios from 'axios';
import { API_KEY,API_URL,IMAGE_BASE_URL,POSTER_SIZE } from './config';
class Movies extends Component {
    state = {
      movies: [],
      genres:[],
      nowplaying:false,
      nowplayinggenreids:[]
    };
  
    async componentDidMount() {
        this.setState({nowplaying:true});

        const nowplayingurl=`${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        const genreurl=`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
    

        axios.all([
          await  axios.get(nowplayingurl),
          await axios.get(genreurl)
          ])
          .then(axios.spread((playing, genre) => {

        
            this.setState({ genres: [...this.state.genres,...genre.data.genres ]});
           
            this.setState({ movies:[...this.state.movies, ...playing.data.results] });
       
           
          }));

    
    }
  
    
    getNameFromId=(id)=> {
     
   const gen=this.state.genres.filter(e=>e.id===id);
  
      return  gen[0].name +"  ";
    }

    render() {
        //getNameFromId=(id)=> id +","  
      console.log(this.state.movies);
      console.log(this.state.genres);

      //getGenreFromIDofMovie=()=>{

     // }
      return (
          
        <div className="container">
          {this.state.movies.map(movie =>
          <div key={movie.id}>
          
          <h1 key={movie.id}> {movie.title} {movie.genre_ids.map(id=>this.getNameFromId(id))}</h1>
          <img key={movie.title} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`} alt=""></img>
    
       </div>
        
         
         )}
        //</div>
       
      );
    }
  }
  export default Movies;