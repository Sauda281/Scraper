// creating selector for mongoose to do crud operation
// way to navigate through all the schemas
// purpose of models is to use pre-build crud method in mongoose
module.exports={
    Article:require("./articles"),
    Note:require("./notes")
}