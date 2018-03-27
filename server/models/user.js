const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
    name : String,
    email : String,
    profile_pic_url: {
      type: String,
      default: 'undefined'
    },
    articleId: [{
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }]
}, {timestamps: true})

module.exports = mongoose.model('User',UserSchema)
