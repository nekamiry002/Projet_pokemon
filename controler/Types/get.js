// import initDatabase from './database.js';
const initDatabase = require('../../database');

async function getTypeById( id ){
    const connectedDb = await initDatabase();
    const data = await connectedDb.collection("Types").findOne({ _id: id });
    return data
}

async function getRandomType(){
    const connectedDb = await initDatabase();
    const data = await connectedDb.collection("Types").find({}).toArray();
    let randomInt = Math.floor(Math.random() * data.length)
    let randomPokemon = data[randomInt]
    return randomPokemon
}

module.exports = {getTypeById, getRandomType};