const router = require('express').Router();
const Movies = require("../models/Movies");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { verify } = require("./verifyToken");

router.get("/:id/comments/new", verify, function(req, res){
    // find movie by id
    Movies.findById(req.params.id, function(err, movie){
        if(err || !movie){
            console.log(err);
        }else{
            res.render("comments", {movie: movie});
        }
    })
});

// Comment create
router.post("/:id/comments", verify, function(req, res){
    // lookup movie using ID
    Movies.findById(req.params.id, function(err, movie){
        if(err || !movie){
            console.log(err);
            res.redirect("/api/movies");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    // add username and id to comment
                    User.findById(req.user._id, function(err, user){
                        if(err){
                            console.log(err);
                        } else {
                            comment.author.id = req.user._id;
                            comment.author.username = user.name;
                            comment.text = req.body.text;
                            // save the comment
                            comment.save();
                            movie.comments.push(comment);
                            movie.save();
                            res.redirect("/api/movies/" + movie._id);
                        }
                    })
                }
            });
        }
    });
});

module.exports = router;
