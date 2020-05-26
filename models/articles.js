var mongoose = require("mongoose")

var Schema = mongoose.Schema

var articleSchema = new Schema({
    title:{
        type: String

    },
    summary:{
        type:String
    },
    image:{
        type:Boolean,
        default:false
    },
    notes:
    [{
        type: Schema.Types.ObjectId,
        ref:"Note"
    }]
})

var Article = mongoose.model("Article", articlesSchema)