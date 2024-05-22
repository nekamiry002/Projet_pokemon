// import initDatabase from './database.js';
const initDatabase = require('../../database');

async function getPokemonById( id ){
    const connectedDb = await initDatabase();
    const data = await connectedDb.collection("Pokemon").findOne({ _id: id });
    return data
}

async function getRandomPokemon(){
    const connectedDb = await initDatabase();
    const data = await connectedDb.collection("Pokemon").find({}).toArray();
    let randomInt = Math.floor(Math.random() * data.length)
    let randomPokemon = data[randomInt]
    return randomPokemon
}

module.exports = {getPokemonById, getRandomPokemon};