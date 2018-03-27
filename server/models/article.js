const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ArticleSchema = new Schema({
    title : String,
    text : String,
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    imgUrl: {
      type: String,
      default: 'undefined'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Article',ArticleSchema)
