var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.param('name', function(req, res, next, name){
	console.log('doing name validations on ' + name);

//	if(name === 'minsu'){
		req.name = name + ' kim';
//	}
	

	next();
});

router.get('/hello/:name', function (req, res) {
	res.send('hello!!' + req.params.name);
});

module.exports = router;
