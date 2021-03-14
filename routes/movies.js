const router = require('express').Router();
const Movies = require("../models/Movies");
const mongoose = require("mongoose");
const path = require('path');
const fs = require("fs");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);  ;
  }
});

const upload = multer({ storage: storage }).single("movieImage");

// Movies.insertMany([
//     {
//         title: "Star Wars: Episode I - The Phantom Menace",
//         image: "star_wars_episode_1_poster.png",
//         rate: 8.5
//     },
//     {
//         title: "Star Wars: Episode II - Attack of the Clones",
//         image: "star_wars_episode_2_poster.png",
//         rate: 9
//     },
//     {
//         title: "Star Wars: Episode III - Revenge of the Sith",
//         image: "star_wars_episode_3_poster.png",
//         rate: 7
//     },
//     {
//         title: "Star Wars: Episode IV - A New Hope",
//         image: "star_wars_episode_4_poster.png",
//         rate: 9.5
//     },
//     {
//         title: "Star Wars: Episode V - The Empire Strikes Back",
//         image: "star_wars_episode_5_poster.png",
//         rate: 7.5
//     },
//     {
//         title: "Star Wars: Episode VI - Return of the Jedi",
//         image: "star_wars_episode_6_poster.png",
//         rate: 8
//     }
// ])


// INDEX route - show all movies
router.get("/", (req, res) => {
    // Get all movies from DB
    Movies.find({}, (err, allMovies) => {
        if(err){
            console.log(err);
        }else{
          // console.log(allMovies);
            res.render("movies/index", {movies: allMovies});
        }
    });
});

router.post("/", (req, res) => {
    upload(req, res, (err) => {
      if (err) res.status(500).json(err);
      else {
        fs.readFile(req.file.path, function (err, data) {
          if (err) throw err;
          else {
            const contentType = req.file.mimetype;
            const newMovie = new Movies({
              _id: mongoose.Types.ObjectId(),
              title: req.body.title,
              movieImage: { data, contentType },
              rate: req.body.rate,
            });
  
            //Saving new movie in db
            newMovie.save((err, movie) => {
              if (err) res.status(500).json({ error: err });
              else {
                res.status(201).json({
                  message: "A new movie added.",
                  movie: movie,
                });
              }
            });
          }
        });
      }
    });
  });


// SHOW route - shows more info about one movie
router.get("/:id", function(req, res){
  // find the movie with provided id
  Movies.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
      if(err || !foundMovie){
          // res.redirect("back");
          console.log(err);
      }else{
          res.render("movies/show", {movie: foundMovie});
          // res.send("WORKING");
      }
  });
});

module.exports = router;
