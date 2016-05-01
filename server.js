"use strict";

var express = require ("express");
var app = express();
var path = require("path");


function sendFile(req, res, dir, fileName){
  var options = {
    root: __dirname + '/src/' + dir,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });  
}

app.get("/", function(req, res){
    sendFile(req, res, "", "index.html");
})

app.get('/:directory/:name', function (req, res, next) {

    var directory = req.params.directory;
    var fileName = req.params.name;
    sendFile(req, res, directory, fileName);  
    
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});





