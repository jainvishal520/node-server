const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

// app.set("View engine","hbs")

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log',log+'\n',(error) => {
		if(error){
			console.log('Unable to append to server.log');
		}
	})
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

//rendering our static files..
app.use(express.static(__dirname+"/public"));

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

app.get('/',(req,res) => {
	res.render('home.hbs',{
		title : 'Welcome to node and express'
	})
});

app.get('/about',(req,res) => {
	res.render('about.hbs',{
		title:'about page'
	})
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage : "Unable to connect"
	})
})

app.listen(3000,() => {
	console.log('server started at port 3000');
});
