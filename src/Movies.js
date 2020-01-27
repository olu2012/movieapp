import React, {Component} from 'react';
import axios from 'axios';
import { API_KEY,API_URL,IMAGE_BASE_URL,POSTER_SIZE } from './config';
class Movies extends Component {
    state = {
      movies: [],
      genres:[],
      nowplaying:false,
      nowplayinggenreids:[],
      ratings:3
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
            //getuniquegenreids
            //console.log('results',playing.data.results);
                
           
          }));
//getthe unique ids
//let genreid=[];

    
   // console.log(genreid);
   // let newgenreids = [...new Set(genreid)];
    //this.state.nowplayinggenreids
    //this.setState({ nowplayinggenreids:[...this.state.nowplayinggenreids, ...newgenreids] });
  //  console.log(this.state.nowplayinggenreids);
    }
  
    //let genreid=[];
    getNameFromId=(id)=> {
     let genreid=[];
   const gen=this.state.genres.filter(e=>e.id===id);
  // console.log(gen[0].id);
   //genreid.push(gen[0].id);
   //console.log(genreid);
   //let newgenreids = [ ...genreid,...gen[0].id];
    //this.state.nowplayinggenreids
   //this.setState({ nowplayinggenreids:[...this.state.nowplayinggenreids, ...genreid ]} );
   // console.log(this.state.nowplayinggenreids);
  const addarray= ()=>{
    genreid.push(gen[0].id)
    //this.setState({ nowplayinggenreids:[...this.state.nowplayinggenreids, ...genreid ]} );
    console.log(genreid);
  }
  addarray();
      return  gen[0].name +"  ";
    }


    handleChange =(event) =>{
        
        this.setState({ratings: event.target.value});

        const fliteredmovies=this.state.movies.filter(e=>e.vote_average >= event.target.value);

this.setState({movies:fliteredmovies});
      }
    render() {
        const renderOption = item => <option value={item}>{item}</option>
      
      return (
          
        <div className="container">
            <div> 
            
          
          
          <label>
          Ratings:
          <input type="text" value={this.state.ratings} onChange={(e)=>this.handleChange(e)} />
        </label>
          </div>
<div>
      {this.state.movies.map(movie=><span key={movie.id}>{movie.genre_ids.map(id=>this.getNameFromId(id))}</span>)}
</div>

          {this.state.movies.map(movie =>
          <div key={movie.id}>
          
          <h1 key={movie.id}> {movie.title} {movie.genre_ids.map(id=>this.getNameFromId(id))}</h1>
          <img key={movie.title} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`} alt=""></img>
    
       </div>
        
         
         )}
         <div> <input type="checkbox" name="vehicle1" value="Bike"/> I have a bike</div>
        </div>
       
      );
    }
  }
  export default Movies;