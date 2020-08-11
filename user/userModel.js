const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy
}

function add(user) {
    return db('users')
        .insert(user, "id")  
        .then(ids => ({ id: ids[0] })); 
}

function find() {
    return db('users').orderBy('id');
}

function findBy(username) {
    return db("users").where({ username }).first();
}