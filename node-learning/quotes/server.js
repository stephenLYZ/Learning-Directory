var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');


//database

var db;

MongoClient.connect('mongodb://Stephen:1234567890@ds023064.mlab.com:23064/quotes',function(err,database){
	if(err) return console.log(err);
	db = database;
	app.listen(process.env.PORT || 3000,function(){
		console.log('listening on 3000');
	});
});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/',function(req,res){
	db.collection('quotes').find().toArray(function(err,result){
		if(err) return console.log(err);
		res.render('index.ejs',{ quotes: result });
	});
});

app.post('/quotes',function(req,res){
	db.collection('quotes').save(req.body,function(err,result){
		if(err) return console.log(err);

		console.log('saved to the database');
		res.redirect('/');
	});
});

