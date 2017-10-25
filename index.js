var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'twitter',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/post',function(req, res){
    var id = req.body.id;
    var data = {
        "error": 1,
        "posts": ""
    };
    
    connection.query("select * from post where user_id=?", [id], function(err, rows, fields){
        if(rows != undefined){
            data["error"] = 0;
            data["posts"] = rows;
            res.json(data);
        }else{
            data["posts"] = 'No post found';
            res.json(data);
        }
    });
});

http.listen(8080, function(){
    console.log("Listening on port 8080");
});