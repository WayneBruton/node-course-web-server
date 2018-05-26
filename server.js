const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {//middleware sample
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();//this must be called otherwise none of the routes will work
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));//Static directory

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
       pageTitle: 'Home Page',
       welcome: 'Welcome to the home page' 
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        Error: 'Error on this page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
