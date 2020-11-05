# node-js-playlist
CSS and asset files for the Net Ninja YouTube nodejs playlist

The final project code can be found in the public/assests folder of this repo

If you have been following the tutorial, code for each and every lesson is added in the Practice folder so you can directly download and check.
All files have been tested.

If more files for  .\Practice\ should be added. They will be added very soon.

## MVC
- Model (Data)
- View (Template)
- Controller (Controls the app sections)

## Controllers

### todoControllers
```JavaScript
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let data = [
	{ item: "get milk" }, { item: "walk dog" }, { item: "kick some coding ass" }
];

module.exports = function(app) {
	app.get('/todo', function(req, res) {
		res.render('todo', { todos: data });
	});

	app.post('/todo', urlencodedParser, function(req, res) {
		data.push(req.body);
		res.json(data);
	});

	app.delete('/todo/:item', function(req, res) {
		const { item } = req.params;
		data = data.filter(d => d.item.replace(/\b/g, '-') !== item);
		res.json(data);
	});
};
```

## Ajax
```JavaScript
$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/\b/g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
```

- use `location.reload()` to reload the page after json data sent back from the server

## NoSQL Database
- Alternative to SQL database
- Store documents (JSON) in a db, instead of tables with rows and columns
- Works really well with JavaScript (and therefore Node.js)

```js
[
	{
		Item: 'walk the dog'
	},
	{
		Item: 'eat some pie'
	}
]
```

## mongoose
Mongoose is a **MongoDB** object modeling tool designed to work in an asynchronous environment.

## Future Node.js Totorials
- MongoDB
- MEAN stack app 
- Unit testing with Mocha
- Websockets