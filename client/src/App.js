import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios'; //allows us to pass variables from front end to back end

function App() {
  const [movieName, setMovieName]=useState("");//State makes the values dynamic and changeable by the user.
  const [review, setReview]=useState("");//we can use setReview(new value) to change the review.

  useEffect(
    ()=>{ 
     Axios.get("http://localhost:3001/api/get").then((response)=>{
       console.log(response.data);//show me all the data that are in the url 'backend'
     }) 
    }, 
    [])

  const submitReview = ()=>{ //this method is for the submit review button
    Axios.post("http://localhost:3001/api/insert", {//Axios.post is used to pass variables from front end to back end
      //pass to localhot:3001/api/insert which is the backend url
      movieName: movieName, //movieName is passed to backend as movieName
      movieReview: review, //review is passed to backend as movieReview
    }).then(()=>{
      alert('successful insert'); 
      console.log("movie submit button working")
    });
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
      </div>
      
    </div>
  );
}
export default App;

/*
1. type 'npm install axios' which lets you use your own api.
*/