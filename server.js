var http = require("http");
var express = require("express");
var app = express(); 
var mongoose = require("mongoose"); 
var cors = require("cors");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var path = require("path");

var port = 4000;

//db configuration

mongoose.connect("mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]", {
  useUnifiedTopology: true, 
  useNewUrlParser: true,
  dbName: Todo
});

app.set("port", process.env.PORT || port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

var Todo = mongoose.model("Todo", {       //todo tasks model
  text: String,
  done: Boolean
});

app.use(cors());

app.get("/api/todos", function(req, res) {                          //get all to do tasks
  Todo.find(function(err, todos) {
    if (err) res.send(err);
    res.json(todos);
  });
});

app.get("/api/todos/:todo_id", function(req, res) {               //get one to do task
  Todo.find(
    {
      _id: req.params.todo_id
    },
    function(err, todos) {
      if (err) res.send(err);
      res.json(todos);
    }
  );
});

app.post("/api/todos", function(req, res) {                       //add to do task
  Todo.create(
    {
      text: req.body.text,
      done: false
    },
    function(err, todo) {
      if (err) res.send(err);
      Todo.find(function(err, todos) {         //return all to do tasks
        if (err) res.send(err);
        res.json(todos);
      });
    }
  );
});

app.delete("/api/todos/:todo_id", function(req, res) {          //delete a to do task
  Todo.remove(
    {
      _id: req.params.todo_id
    },
    function(err, todo) {
      if (err) res.send(err);
      Todo.find(function(err, todos) {          //return all to do tasks
        if (err) res.send(err);
        res.json(todos);
      });
    }
  );
});

app.put("/api/todos/update/:todo_id", function(req, res){       //update to do task
  Todo.updateOne(
    {
      _id: req.params.todo_id
    },
    {
      done: req.body.done
    },
      function(err, todo) {
        if (err) res.send(err);
        
      Todo.find(function(err, todos) {          //return all to do tasks
        if (err) res.send(err);
        res.json(todos);
      });
    }
  );
});

app.get("*", function(req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
});

var server = http.createServer(app);
server.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
