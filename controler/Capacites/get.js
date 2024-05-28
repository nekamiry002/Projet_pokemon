// import initDatabase from './database.js';
const initDatabase = require('../../database');

async function getCapaciteById( id ){
    const connectedDb = await initDatabase();
    const data = await connectedDb.collection("Capacites").findOne({ _id: id });
    return data
}

async function getRandomCapacite(){
    const connectedDb = await initDatabase();
    const data = await connectedDb.collection("Capacites").find({}).toArray();
    let randomInt = Math.floor(Math.random() * data.length)
    let randomPokemon = data[randomInt]
    return randomPokemon
}

module.exports = {getCapaciteById, getRandomCapacite};