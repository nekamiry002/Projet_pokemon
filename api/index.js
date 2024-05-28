const express = require('express')
const fs = require('fs/promises');
const fileData = require('../data/pokemon-data.json')
const axios = require('axios');
const { type } = require('os');
const cors = require('cors');
// import initDatabase from './database.js';
const initDatabase = require('../database');
const {getPokemonById, getRandomPokemon} = require('../controler/Pokemon/get');
const {getCapaciteById, getRandomCapacite} = require('../controler/Capacites/get');

const app = express()

// let path = "../data/pokemon-data.json"

//GET PUT UPDATE DELETE CREATE
app.use(cors());

app.get('/random', function (req, res) {
    console.log(fileData.length)
    let randomInt = Math.floor(Math.random() * fileData.length)

    let randomPokemon = fileData[randomInt]

    res.send(randomPokemon)
})



app.get('/aleatoire', async function (req, res) {
    let randomPokemon = await getRandomPokemon();
    res.send(randomPokemon)
})

app.get('/attackById/:id', async function (req, res) {
    let id = req.params.id
    let Capacite = await getCapaciteById(id);
    res.send(Capacite)
})


app.get('/', function (req, res) {
    // Do something with the data
    res.send('en gros, tu peux chercher des pokemons selon des caracteristiques dans l\'url')
})

 

app.get('/liste/types', function (req, res) {
    // Do something with the data

    let listeAllTypes = fileData.map( pokemon => pokemon.Types)
    console.log(listeAllTypes)
    
    let listeTypes = []

    listeAllTypes.forEach(doubleTypes => {
        doubleTypes
        .replace("[", "")
        .replace("]", "")
        .replaceAll(" ", "")
        .replaceAll("'", "")
        .split(",")
        .forEach(type => {
            if(listeTypes.includes((type)) === false){
                listeTypes.push(type)
            }
        })
    });

    res.send(listeTypes)
})



app.get('/random/:type', function (req, res) {
    let type = req.params.type
    // Do something with the data
    rdmPkmnFromType = fileData.filter((pokemon) => pokemon["Types"].toLowerCase().includes(type.toLowerCase()))
    
    let randomInt = Math.floor(Math.random() * rdmPkmnFromType.length)

    let randomPokemon = rdmPkmnFromType[randomInt]

    res.send(randomPokemon)
})



app.get('/random/stage/:stage', function (req, res) {
    let stage = req.params.stage
    // Do something with the data
    let fileData = []
    if(stage == 0){
        fileData = fileData.filter((pokemon) => pokemon["Next Evolution(s)"].length > 2)
    }
    else{
        fileData = fileData.filter((pokemon) => pokemon["Next Evolution(s)"].length <= 2)
    }   
    let randomInt = Math.floor(Math.random() * fileData.length)

    let randomPokemon = fileData[randomInt]

    res.send(randomPokemon)
})

app.get('/random/tier/:tier', function (req, res) {
    let tier = req.params.tier
    //tier = tier.toLowerCase()
    console.log(tier == "null")

    // Do something with the data
    fileData = fileData.filter((pokemon) =>{
        //console.log(pokemon["Tier"])
        let pkmntier = pokemon["Tier"]
        if(pokemon["Tier"] != null){
            pkmntier = pokemon["Tier"].toLowerCase()
        }else{
            pkmntier = "null"
            //console.log(tier == "null")
            //console.log("oui1")
        }
        
        if(pkmntier === tier.toLowerCase()){
            return pokemon
        }else if(pkmntier == "null" && tier == "null"){
            return pokemon
        }else{

        }

    })
    //console.log(fileData.length)
    let randomInt = Math.floor(Math.random() * fileData.length)

    let randomPokemon = fileData[randomInt]

    res.send(randomPokemon)
})





// test;
// initDatabase();






app.listen(3001, () => {
  console.log("Serveur lancé sur l'adresse http://localhost:3001/");
})