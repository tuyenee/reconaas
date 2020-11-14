const admin = require("firebase-admin");

const serviceAccount = require("../firebase.secret.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://taptactoe.firebaseio.com"
});

const db = admin.firestore();

module.exports.storage = db;
