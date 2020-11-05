const mongoose = require('mongoose');


// Connect to the database
mongoose.connect('mongodb+srv://chondan:Wswl6M098Bl0IzQl@cluster0.gclzc.mongodb.net/node-tuts?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Create a schema - this is like a blueprint 
const todoSchema = new mongoose.Schema({
	item: String
});

const Todo = mongoose.model('Todo', todoSchema);



const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let data = [
	{ item: "get milk" }, { item: "walk dog" }, { item: "kick some coding ass" }
];

module.exports = function(app) {
	app.get('/todo', function(req, res) {
		// get data from mongodb and pass it to view
		Todo.find({}, function(err, data) {
			if (err) throw err;
			res.render('todo', { todos: data });
		});
	});

	app.post('/todo', urlencodedParser, function(req, res) {
		// get data from the view and add it to the mongodb
		const newTodo = Todo(req.body).save(function(err, data) {
			if (err) throw err;
			res.json(data);
		})
	});

	app.delete('/todo/:id', function(req, res) {
		const { id } = req.params;
		// delete the requested item from mongodb
		Todo.findById(id, function (err, item) {
		  if (!err) {
		    item.remove();
		    item.save(function (err) {
		      // do something
		      res.json(item);
		      console.log("removed item");
		    });
		  }
		});
	});
};

