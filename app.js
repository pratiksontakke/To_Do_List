const express = require("express");
const bodyParser = require("body-parser");
const ejsLint = require('ejs-lint');
const mymodule = require(__dirname + "/mymodule.js");
const app = express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.set("view engine", "ejs");
//Decleare global variables
const list_item = [];
const workItem = [];
// let item = "";

app.get("/", function(req, res) {

  let day = mymodule.date();
  res.render("list", {
    listTitle: day,
    items: list_item,
  })

})

app.post("/", function(req, res) {

  function specificpush() { // for push item in specific array
    if (req.body.list === "Work List") {
      workItem.push(justItem);
      res.redirect("/work");
    } else {
      list_item.push(justItem);
      res.redirect("/");
    }
    console.log(req.body);
  }

  let string = req.body.newItem
  justItem = string.trim()
  justItem = mymodule.capitalfirstlatter(justItem)
  if (justItem === "") { //to ovide white space
    var typeerror = "Type some task";
    console.log(typeerror);
    if (req.body.list === "Work List") {
      res.redirect("/work");
    } else {
      res.redirect("/");
    }
    console.log(req.body);
  } else {
    specificpush();
  }

})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    items: workItem,
  })

})

app.get("/about", function(req, res) {
  res.render("about");
})


app.listen(3000, function() {
  console.log("server is running on port 3000 !")
})
