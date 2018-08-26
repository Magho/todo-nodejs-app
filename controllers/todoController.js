var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false});

var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:test123@ds235022.mlab.com:35022/todo');

//create a schema 
var todoSchema = new mongoose.Schema({
	item : String
});

// create model
var Todo = mongoose.model('Todo', todoSchema);

// create first item 
var itemOne = Todo({ item : 'study Ml' }).save(function(err){
	if (err)throw err;
	console.log('item saved');
});


var data = [
	{item : 'study Ml'},
	{item : 'revise holy qouran'},
	{item : 'apply project on studied material'},
	{item : 'go to gym'}
];

module.exports = function(app) {

	app.get('/todo', function(req, res){
		res.render('todo', {todos : data});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		data.push(req.body);
		res.json(data);
	});

	app.delete('/todo/:item', function(req, res){
		data = data.filter(function(todo){
			return todo.item.trim() !== req.params.item.trim();
		});
		res.json(data);
	});
};