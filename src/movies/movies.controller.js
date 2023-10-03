const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function movieExists(req, res, next){
    const movie = await service.read(req.params.movieId);

    if(movie){
        res.locals.movie = movie;
        return next();
    }

    next({status: 404, messagae: "Movie cannot be found"})
}

async function read(req, res){
    const {movie: data} = res.locals;
    res.json({data})
}

async function list(req, res, next){
    const isShowing = req.query.is_showing;

    let movies;

    if (isShowing){
        movies = await service.listShowing();
    } else{
        movies = await service.list();
    }

    res.json({data: movies});
}

async function listTheatersShowingMovie(req, res, next) {
    const movieId = req.params.movieId
    const theaters = await service.listTheatersShowingMovie(movieId)
    res.json({data: theaters});
}

async function listReviewsForMovie(req, res, next){
    const movieId = req.params.movieId;
    const reviews = await service.listReviewsForMovie(movieId)

    res.json({data: reviews})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheatersShowingMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersShowingMovie)],
    listReviewsForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsForMovie)],
}