var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/api');

var Bear = require('./models/bear');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use(function(req, res, next){

    console.log('Something is happening.');
    next();

});

router.get('/', function(req, res){
    res.json({message: 'wow!!! this is so good!!'});
});

router.route('/bears')
    .post(function(req, res){
        console.log('works!');
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function(err){

            if(err){
                res.send(err);
            }
            res.json({message : 'Bear created!!'});

        });

    })
    // get all the bears (accessed at GET http://localhost:3000/api/bears)
    .get(function(req, res){

        Bear.find(function(err, bears){

            if(err)
                res.send(err);
            res.json(bears);

        });

    });
router.route('/bears/:bear_id')
    .get(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){

            if(err)
                res.send(err);
            res.json(bear);

        });
    })
    .put(function(req, res){

        Bear.findById(req.params.bear_id, function(err, bear){

            if(err)
                res.send(err);
            bear.name = req.body.name;

            bear.save(function(err){

                if(err)
                    res.send(err);
                res.json({message : 'Bear updated!'});

            });

        })

    })
    .delete(function(req, res){
        Bear.remove({
            _id : req.params.bear_id
        }, function(err, bear){
            if(err)
                res.send(err);
            res.json({message : 'Successfully deleted'});
        });
    })

app.use('/api', router);
//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
