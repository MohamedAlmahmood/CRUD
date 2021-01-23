const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'CRUDDataBase',
});
app.use(cors());
app.use(express.json());//must use this to pass to backend
app.use(bodyParser.urlencoded({extended: true}));//you just have to put this

app.post("/api/insert", (req,res)=>{
    //we use axios and bodyparser to get the variables from the front end. 
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    //create a query that will be inserting information to the database
    const sqlInsert = 
    "INSERT INTO movie_reviews (movie_name, movie_reviews) VALUES (?,?)";
    //we dont want to directly pass the variables for security reasons.
    db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
        //if it works print the following in log
        console.log(err);
    });
});


/*app.get("/", (req, res)=>{});*/

/*
When we are at the home url "http://localhost:3001/" we want the page to res 'respond' with hello. 
req: require: get information from the front end.
res: response: send information to the front end. 
*/



app.listen(3001, ()=>{
    console.log("runnning on port 3001 using devStart");
});

/*
1. go to the folder
2. type 'npm init'
3. click enter to all the questions.
4. package.json is created.
5. create a file called index.js
6. type 'npm isntall express body-parser mysql'
7. type 'npm install nodemon'
9. type 'npm install cors' 
8. add to package.json below the scripts section:
    a. "start": "node index.js",
    b. "devStart": "nodemon index.js",
9. now to run the server type 'npm run devStart'
*/