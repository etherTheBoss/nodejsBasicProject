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

var itemOne = Todo({item: 'ethe the boss'}).save(function(err){
    if (err) throw err;
    console.log('data has been saved successfully');
});

 var data =[{item :'milk'},{item: 'apple'}, {item: 'grap'}];
 var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        res.render('todo', {todos :data});

    });

    app.post('/todo', urlencodedParser, function (req, res) {

        
        data.push(req.body);
        res.json(data);

    });

    app.delete('/todo/:item', function (req, res) {
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};