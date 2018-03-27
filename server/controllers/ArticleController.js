const Article = require('../models/article.js');
const User = require('../models/user.js');

module.exports = {

  getArticle: (req, res) => {
    console.log('starting art controller');
    User.findOne({
      name: req.decoded.name,
      email: req.decoded.email
    })
    .exec().then(foundUser => {
      console.log(foundUser);
      if (foundUser == null) {
        return res.status(404).json({
          message: "No matching user was found."
        })
      }
      console.log(foundUser._id);
      Article.find({userId: foundUser._id})
        .limit(30)
        .exec().then(foundArticles => {
          console.log(foundArticles);
          if (foundArticles.length < 1) {
            return res.status(404).json({
              message: 'No article found'
            })
          }
          res.status(200).json({
            message: 'Articles Found',
            articles: foundArticles
          })
        })
        .catch(err => {
          res.status(500).json({
            message: 'Server error on finding articles',
            err: err
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Server error on finding User',
        err: err
      })
    })


  },

  getOneArticle: (req, res) => {
    console.log('======================================================================================================================');
    console.log(req.params);
    Article.findOne({_id: req.params.articleId})
    .populate('userId')
    .exec().then(foundArticle => {
      console.log(foundArticle);
      if (!foundArticle) {
        return res.status(404).json({
          message: "No matching Article was found."
        })
      }
      res.status(200).json({
        message: 'found article',
        article: foundArticle
      })
    }).catch(err => {
      res.status(500).json({
        message: 'Server error on finding User',
        err: err
      })
    })
  },

  createArticle: (req, res) => {
    console.log('===========decoded==========');
    console.log(req.decoded);
    User.findOne({
      name: req.decoded.name,
      email: req.decoded.email
    })
    .exec().then(foundUser => {
      console.log(foundUser);
      if (foundUser == null) {
        return res.status(404).json({
          message: "No matching user was found."
        })
      }
      console.log(req.body);
      let imageUrl;
      if (req.file) {
        imageUrl = req.file.cloudStoragePublicUrl
      } else {
        imageUrl = 'undefined'
      }
      let newArticle = new Article({
        title: req.body.title,
        text: req.body.text,
        userId: req.params.userId,
        imgUrl: imageUrl
      })
      foundUser.articleId.push(newArticle._id)
      foundUser.save( () => {
        newArticle.save((err, savedArticle) => {
          if (err) {
            return res.status(500).json({
              message: "Article failed to be created"
            })
          }
          return res.status(201).json({
            message: 'Article created',
            newArticle: savedArticle
          })
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Server error on finding User',
        err: err
      })
    })
  },

  editArticle: (req, res) => {
    let articleId = req.params.articleId
    let updateData = {}
    if (req.body.title) {updateData.title = req.body.title}
    if (req.body.text) {updateData.text = req.body.text}
    if (req.file) {updateData.imgUrl = req.file.cloudStoragePublicUrl}

    User.findOne({
        name: req.decoded.name,
        email: req.decoded.email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }
        Article.findOneAndUpdate({_id:articleId}, updateData, {new:true})
          .exec().then(updatedArticle => {
            res.status(200).json({
              message:'Successfully updated Article',
              updatedArticle: updatedArticle
            })
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })

  },

  deleteArticle: (req, res) => {
    let articleId = req.params.articleId;
    User.findOne({
        name: req.decoded.name,
        email: req.decoded.email
      }).exec().then(foundUser => {
        if (foundUser == null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }

        Article.findOne({_id:articleId})
          .exec().then(foundArticle => {
            if (String(foundArticle.userId) !== String(foundUser._id)) {
              return res.status(404).json({
                message: "No matching article for this user was found."
                })
            }
            foundArticle.remove().then(deletedArticle => {
                res.status(200).json({
                  message: 'Article Successfully removed',
                  deletedArticle : deletedArticle
                })
            })
            .catch(err => {
              res.status(500).json({
                message: err.message
              })
            })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

};
