// importing axios
var db = require("../models")

var axios = require("axios")

var cheerio = require("cheerio")

function apiRoutes(app){
    app.get("/scrape", (req, res)=> {

    axios.get("https://www.nytimes.com").then(function(results){

    db.Article.remove().then(function(result){
        var $ = cheerio.load(results.data)
        // scraping article using cheerio with the article class name block.post and inside that you have children that have the image, title, link and summary
        $("article.block-post").each(function(i,element){
            var image = $(this).children("a").children("img").attr("data-src")
            var title = $(this).children("div.block-post-summary").attr("href")
            var summary = $(this).children("div.block-post-summary").text()

            console.log(image)
            console.log(title)
            console.log(link)
            console.log(summary)

            db.Article.create({
                title:title,
                summary:summary,
                link:link,
                image:image
            })
        })

        res.send("Scrape complete")
    })

    });
 
    app.get("/", (req, res) => {
        db.Article.find({saved:false}).then(function(results){
            var newResults = []
            for (let index = 0; index < results.length; index++) {
                 
                newResults.push({
                    title: results[index].title,
                    summary:results[index].summary,
                    link:results[index].link,
                    image:results[index].image,
                    _id:results[index]._id
                })
            }
            res.render("index", {articles:newResults})
        })
    });

    app.put("/api/articles/:id", function(req, res){
        var id = req.params.id

        db.Article.update({_id:id},{saved:true}).then(function(results){

        })
    })
    app.delete("/api/articles/:id", function(req, res){
        var id = req.params.id

        db.Article.remove({_id:id}).then(function(results){
            res.json(results)
        })
    })
    app.get("/saved", (req, res) =>{
        db.Article.find({saved:true}).then(function(results){
            var newResults = []
            for (let index = 0; index < results.legth; index++){
                newResults.push({
                    title: results[index].title,
                    summary:results[index].summary,
                    link:results[index].link,
                    image:results[index].image,
                    _id:result[index]._id
               })
            }
            res.render("saved", {articles:newResults})
        })
    });

    })
}

module.exports = apiRoutes