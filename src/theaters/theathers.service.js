const knex = require("../db/connection");

function list(){
    return knex("theaters").select("*");
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
    create,
    read,
    update,
    delete: destroy,

}; 