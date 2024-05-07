// mongodb.connect('mongodb+srv://Nekamiry02:SUriZGP4m4WWWeso@projetpkmn.rtpwixk.mongodb.net/Projet_pokemon')
// .then(() => {
//   console.log('Connecté à la base de données MongoDB');
// })
// .catch((err) => {
//   console.error('Erreur de connexion à la base de données MongoDB :', err);
// });


// import { MongoClient, Db } from "mongodb";
const { MongoClient } = require('mongodb');
require('dotenv').config();

let databaseUrl = process.env.URL_MONGODB;

let cachedDb = null;
let promise = null;

const initDatabase = async () => {
  if (cachedDb) {
    console.log("Using existing connexion !👌");
    return cachedDb;
  }

  if (!promise) {
    promise = new MongoClient(databaseUrl, {
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
    });
  }

  console.log("Creating db connexion ");

  const client = await promise;
  const db = await client.db();

  cachedDb = db;
  return cachedDb;

};


// export default initDatabase;
module.exports = initDatabase;



  // return client
  //   .connect()
  //   .then((client) => {
  //     let db = client.db();
  //     console.log("Caching DB here");

  //     cachedDb = db;
  //     return cachedDb;
  //   })
  //   .catch((err) => {
  //     console.log("Error connecting to database");
  //     console.log(err);
  //   });