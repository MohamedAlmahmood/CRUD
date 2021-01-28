import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios'; //allows us to pass variables from front end to back end

function App() {
  const [movieName, setMovieName]=useState("");//State makes the values dynamic and changeable by the user.
  const [review, setReview]=useState("");//we can use setReview(new value) to change the review. In this case the state is a text
  const [movieList, setmovieList]=useState([]);//The use state is going to be an array.
  const [newReview, setNewReview]=useState("");


  useEffect(
    //used as a side effect of the app being rendered. 
    //useEffect will show the result after the app is rendered.
    //so this code will be executed later because we are using useEffect
    //get the information from api/get and set it equal to setmovieList variable.
    ()=>{ 
     Axios.get("http://localhost:3001/api/get").then((response)=>{
       setmovieList(response.data)//array semovieList = response.data array
     }) 
    }, 
    [])


  const submitReview = ()=>{ //this method is for the submit review button
    Axios.post("http://localhost:3001/api/insert", {//pass the information from to this backend url
      //pass to localhot:3001/api/insert which is the backend url
      movieName: movieName, //movieName is passed from input to backend as movieName
      movieReview: review, //review is passed from input to backend as movieReview
    })
    /* add new value to the movieList once the submitReview button is pressed*/
    setmovieList([...movieList, {movie_name: movieName, movie_reviews: review},])
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  };

  const updateReview= (movie)=>{
    Axios.put("http://localhost:3001/api/update",{
      movieName: movie, //movie is passed from front end to backend
      movieReview: newReview, //newReview is passed from front end to backend
    })
    //setNewReview(""); 
  };

  return (
    <div className="App">

      <h1>
        CRUD APPLICATION
      </h1>

      <div className="form">
        <label>Movie Name</label>
        <input 
         type="text" //the input is text
         name="movieName" //the name of the input
         onChange={(e)=>{
          setMovieName(e.target.value);//new value of moviename
        }}></input>

        <label>Review</label>
        <input 
        type="text" 
        name="review" 
        onChange={(e)=>{
          setReview(e.target.value);
        }}></input>
        <button onClick={submitReview}>submit</button>
       
        
        {movieList.map((val)=>{//map through the list and grab each value.  
          return ( 
            <div className="card">
              <h1>{val.movie_name}</h1>  
              <p>{val.movie_reviews}</p>

              <button onClick={()=> {
                deleteReview(val.movie_name)//send the current movie to the deleteReview method which will send it to the backend.
              }}>Delete</button>

              <input type="text" id="updateInput" onChange={(e)=>{
                setNewReview(e.target.value)
              }}></input>

              <button onClick={()=>{
                updateReview(val.movie_name)//send the current movie to the update Review method which will send it to the backend.
                }}>Update</button>
            </div>
          )
            
        })}

      </div>
      
    </div>
  );
}
export default App;

/*
1. type 'npm install axios' which lets you use your own api.
*/