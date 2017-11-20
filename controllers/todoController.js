/**
 * Created by
 * HABIBUR RAHMAN
 * Sr. Software Engineer
 * hrekns@yahoo.com
 * created on 11/10/2017.
 */

 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

//  CONNECT TO DATABASE
mongoose.connect('mongodb://nodejsbasicproject:nodejsbasicproject@ds257495.mlab.com:57495/nodejs_basic_project');

// CREATE A SCHEMA 
var todoSchema = new mongoose.Schema({item: String});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'ethe the boss'}).save(function(err){
//     if (err) throw err;
//     console.log('data has been saved successfully');
// });

//  var data =[{item :'milk'},{item: 'apple'}, {item: 'grap'}];
 var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

    app.get('/todo', function (req, res) {

        // get data from mongoBD and pass it to the view    
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos :data});
        });  
        

    });

    app.post('/todo', urlencodedParser, function (req, res) {

        // get data form the view and add it to mongoBD
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });

    });

    app.delete('/todo/:item', function (req, res) {
        // delete request form mongoBD
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};