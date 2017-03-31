var express = require('express');
var mysql = require('mysql');
var app = express();
 var bodyParser = require("body-parser");
 var async = require("async");

// set the view engine to ejs
app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static("."));

// use res.render to load up an ejs view file
var connection = mysql.createConnection({
    host: '206.12.96.242',
    user: 'group7',
    password: 'untanglingGroup7',
    database: 'ndb'
});
connection.connect();

var listings;
var classType;

connection.query('SELECT * FROM p3items', function(err, rows, fields) {
    if (err) throw err;

    listings = rows;
    console.log("printing data");
    console.log(listings[0]);
    console.log(listings[1]);
    console.log(listings[2]);
    console.log(listings[3]);
    console.log(listings[4]);
});

connection.query('SELECT DISTINCT p3items.class FROM p3items', function(err, rows, fields) {
    if (err) throw err;

    classType = rows;
    console.log("printing data");
    console.log(classType[0]);
    console.log(classType[1]);
    console.log(classType[2]);
    console.log(classType[3]);
    console.log(classType[4]);
    
});

connection.end();

app.get('/hw11', function(req, res) {

 res.render('hw11', { classType: classType, listings: listings })
//res.render('product1', JSON.stringify({listings: listings, classType: classType}))
  
})





//query
app.post('/query', function(req, res) {

     console.log(req.body);
    async.series([function(callback) {
            var connection = mysql.createConnection({
                host: '206.12.96.242',
                user: 'group7',
                password: 'untanglingGroup7',
                database: 'ndb'
            });
            connection.connect();
             console.log(req.body.queryStr);
            var q = 'SELECT * FROM p3items WHERE p3items.name LIKE "' + req.body.queryStr + '"';
           
            connection.query(q, function(err, rows, fields) {
                if (err) throw err;

                listings = rows;
                //console.log(rows[0]);
                connection.end();
                callback(null, "query done");
            });


        }, function(callback) {
            res.redirect("/");
            callback(null, "display done");
        }


    ], function(err, results) {
        //console.log(results);
        //could do some error processing here
    });



});



app.listen(8007, function() {
    console.log('Example app listening on port 8007!')
})


