const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12334556',
    database: 'CRUDDataBase'
})


app.get("/", (req, res)=>{
    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_reviews) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result)=>{
        res.send("sql inserted"); //send the response to the front end
    })  
});

/*
When we are at the home url "http://localhost:3001/" we want the page to res 'respond' with hello. 
req: require: get information from the front end.
res: response: send information to the front end. 
*/



app.listen(3001, ()=>{
    console.log("runnning on port 3001 using devStart")
});

/*
1. go to the folder
2. type 'npm init'
3. click enter to all the questions.
4. package.json is created.
5. create a file called index.js
6. type 'npm isntall express body-parser mysql'
7. type 'npm install nodemon' 
8. add to package.json below the scripts section:
    a. "start": "node index.js",
    b. "devStart": "nodemon index.js",
9. now to run the server type 'npm run devStart'
*/