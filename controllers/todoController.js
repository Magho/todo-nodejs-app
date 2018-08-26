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

module.exports = function(app) {

	app.get('/todo', function(req, res){
		// get data from mongodb and pass it to the view
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos : data});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// get data from view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req, res){
		// delete the requseted item from mongodb
		Todo.find({item : req.params.item.trim()}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});
};