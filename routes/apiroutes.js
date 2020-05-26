// importing axios
var db = require("../models")

var axios = require("axios")

var cheerio = require("cheerio")

function apiRoutes(app){
    app.get("/scrape", (req, res)=> {

    axios.get("").then(function(results){

    db.Article.remove().then(function(result){
        var $ = cheerio.load(results.data)
    })
    })
    })
}