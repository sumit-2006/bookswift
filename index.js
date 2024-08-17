const express = require('express')
const app = express()
const mysql = require('mysql')
// static files setup
app.use(express.static('./public'))
// ejs setup
app.set("view engine","ejs");
// mediator
app.use(function(req,res,next){
    console.log("i am mediator");
    next();
})
// Create a MySQL connection
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'coder',
    password: 'coder',
    database: 'db1' // Use the name of the database you created
});
//routes for different pages 
app.get('/profile/:username', function (req, res) {
    res.send(`Hello from ${req.params.username}`)
  })
  app.get('/register', function (req, res) {
    res.send('Hello from registration page')
  })
  app.get('/login', function (req, res) {
    // res.send('Hello from login page')
     // Fetch users from the database
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
        console.error('Error fetching users from the database: ' + error.stack);
        return res.status(500).json({ error: 'Failed to fetch users' });
  }

  // Send the fetched data as a response
   res.json(results);
});
  })
app.get('/', function (req, res) {
  res.render("first");
})

app.listen(3000)