# Movie-app

A full stack MEN app with authentication and authorization that allows users to view ratings and comments on star war movies and also add their own comments.

## Installation

Use the npm package manager to install node modules

```
npm install
```

Start the app on your local host 3000

```
npm start
```

## Stack used

* Frontend: ejs, Bootstrap, CSS
* Backend: NodeJS, ExpressJS
* Database: MongoDB, Mongoose

## Features

* Signin/Signup the users
* Authorized users are allowed to add comments on the movies

## API

### Users

* GET /api/users/login
* POST /api/users/login
* GET /api/users/register
* POST /api/users/register

## Movies

* GET /api/movies
* POST /api/movies
* GET /api/movies/:id

## Comments

* GET /api/movies/:id/comments/new
* POST /api/movies/:id/comments
