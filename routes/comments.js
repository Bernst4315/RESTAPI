const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
    .route("/")
        .get((req, res, next) =>{
            //const userComments = req.query.comments
            
            if(comments) res.json(comments);
            else next();
        })
        .post((req, res, next) => {
            if (req.body.userId && req.body.title && req.body.content) {
              const comment = {
                id: comments[comments.length - 1].id + 1,
                userId: req.body.userId,
                postId: req.body.postId,
                body: req.body.body,
              };
        
              comments.push(comment);
              res.json(comments[comments.length - 1]);
            } else next(error(400, "Insufficient Data"));
          });

        // .get((req, res, next) =>{
        //     const userPosts = posts.filter((p) => p.userId == req.params.id);
        //     if (userPosts.length) res.json(userPosts);
        //     else next(); 
        //   })

module.exports = router;