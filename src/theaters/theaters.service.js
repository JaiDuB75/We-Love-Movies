const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    m_created_at: ["movies", null, "created_at"],
    m_updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    mt_theater_id: ["movies", null, "theater_id"],
})

function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then(theaters => addMovies(theaters))
}

function read(theaterId){
    return knex("theaters")
        .select("*")
        .where({theater_id: theaterId})
        .first();
}

function update(updatedTheater){
    return knex("theaters")
        .select("*")
        .where({theater_id: updatedTheater.theater_id})
        .update(updatedTheater, "*")
        .then((updatedTheater) => updatedTheater[0]); 
}

function create(theater){
    return knex("theaters")
        .insert(theater)
        .returning("*")
        .then((createdTheaters) => createdTheaters[0]);
}

function destroy(theater_id){
    return knex("theaters").where({theater_id}).del();
}

module.exports = {
    list,

}; 