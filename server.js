var express = require("express");

var app = express()

var mongoose = require("mongoose")

var expressHandleBars = require("express-handlebars")
app.engine("handlebars", expressHandleBars({defaultLayout:"main"}))

app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

var apiRoutes = require("./routes/apiroutes")

apiRoutes(app)

var MONGODB_URI =process.env.MONGO_URI || "mongodb://localhost/scraperdb"

mongoose.connect(MONGODB_URI)

console.log("successfully connected to mongodb")



var PORT = process.env.PORT || 5000


 
app.listen(PORT, function(){
    console.log("App is listening http://localhost:" + PORT)
})
