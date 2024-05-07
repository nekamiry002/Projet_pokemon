const express = require('express')
const fs = require('fs/promises');
const axios = require('axios');
const { type } = require('os');
const cors = require('cors');
// import initDatabase from './database.js';
const initDatabase = require('./database');


const app = express()

let path = "./data/pokemon-data.json"

//GET PUT UPDATE DELETE CREATE
app.use(cors());

app.get('/random', function (req, res) {
    fs.readFile(path)
    .then((data) => {
    // Do something with the data
        let fileData = JSON.parse(data)
        console.log(fileData.length)
        let randomInt = Math.floor(Math.random() * fileData.length)

        let randomPokemon = fileData[randomInt]

        res.send(randomPokemon)

    })
    .catch((error) => {
      // Do something if error 
    });
})

app.get('/', function (req, res) {
    fs.readFile(path)
    .then((data) => {
        // Do something with the data
        
        res.send('en gros, tu peux chercher des pokemons selon des caracteristiques dans l\'url')
  
    })
    .catch((error) => {
        // Do something if error 
    });
})

 

app.get('/liste/types', function (req, res) {
    fs.readFile(path)
    .then((data) => {
        // Do something with the data
        let fileData = JSON.parse(data)

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
    .catch((error) => {
        // Do something if error 
    });
})

/*app.get('/random/2/:type', async function (req, res) {
    let type = req.params.type
    const data = await fs.readFile(path)
    
    //axios.get("http://localhost:3000/liste/types")
    
    //.then((data) => {
    // Do something with the data
    let fileData = JSON.parse(data).filter((pokemon) => pokemon["Types"].toLowerCase().includes(type.toLowerCase()))
    
    let randomInt = Math.floor(Math.random() * fileData.length)

    let randomPokemon = fileData[randomInt]

    res.send(randomPokemon)
    //})
    //.catch((error) => {
      // Do something if error 
    //});
})*/


app.get('/random/:type', function (req, res) {
    let type = req.params.type
    fs.readFile(path)
    .then((data) => {
    // Do something with the data
        let fileData = JSON.parse(data).filter((pokemon) => pokemon["Types"].toLowerCase().includes(type.toLowerCase()))
        
        let randomInt = Math.floor(Math.random() * fileData.length)

        let randomPokemon = fileData[randomInt]

        res.send(randomPokemon)

    })
    .catch((error) => {
      // Do something if error 
    });
})



app.get('/random/stage/:stage', function (req, res) {
    let stage = req.params.stage
    fs.readFile(path)
    .then((data) => {
    // Do something with the data
        let fileData = []
        if(stage == 0){
            fileData = JSON.parse(data).filter((pokemon) => pokemon["Next Evolution(s)"].length > 2)
        }
        else{
            fileData = JSON.parse(data).filter((pokemon) => pokemon["Next Evolution(s)"].length <= 2)
        }   
        let randomInt = Math.floor(Math.random() * fileData.length)

        let randomPokemon = fileData[randomInt]

        res.send(randomPokemon)

    })
    .catch((error) => {
      // Do something if error 
    });
})

app.get('/random/tier/:tier', function (req, res) {
    let tier = req.params.tier
    //tier = tier.toLowerCase()
    console.log(tier == "null")

    fs.readFile(path)
    .then((data) => {
    // Do something with the data
        let fileData = JSON.parse(data).filter((pokemon) =>{
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
    .catch((error) => {
      // Do something if error 
    });
})






initDatabase();






app.listen(3001, () => {
  console.log("Serveur lancé sur l'adresse http://localhost:3001/");
})