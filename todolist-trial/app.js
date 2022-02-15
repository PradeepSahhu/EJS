
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

items = ["Reading books", "Studying korean", "Learning"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res) {

  var today = new Date();


  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  var day = today.toLocaleDateString("en-us", options);

  res.render("list", {
    dayitem: day,
    Newitems: items
  });
});

app.post("/", function(request, responce){
  var item = request.body.newItem;
  items.push(item);

  responce.redirect("/");

});


app.listen(3000,function(){
  console.log("Your server is running at port: 3000");
});
