/**
 * Created by
 * HABIBUR RAHMAN
 * Sr. Software Engineer
 * hrekns@yahoo.com
 * created on 11/10/2017.
 */


var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();


//SET UP TEMPLATE ENGINE
app.set('view engine', 'ejs');

// STATIC FILES
app.use(express.static('./public'));

// FIRE CONTROLLERS
todoController(app);


// LISTEN TO PORT
app.listen(8000);
console.log('hello habib you are starting new node js app');