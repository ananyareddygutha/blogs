var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    author : {
        id: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        username: String
    },
    createdAt : {type : Date ,default : Date.now},
    title : String,
    image : String,
    description : String
});

module.exports = mongoose.model("Blog",blogSchema);