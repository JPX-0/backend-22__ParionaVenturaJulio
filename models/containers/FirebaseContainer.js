const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { DB_CONFIG } = require("../../utils/config");
const { v4: uuid } = require("uuid");

let count = 0;
class FirebaseContainer {
  constructor(coll) {
    this.connect();
    const db = getFirestore();
    this.query = db.collection(coll);
  }

  connect() {
    if(!count) { // Una vez inicializado la coneccion no volvera a llamarse.
      admin.initializeApp({
        credential: admin.credential.cert(DB_CONFIG.firebase.credential)
      });
      console.log("Connected to Firestore!");
    }
    count++;
  }

  async getAll() {
    const docRef = await this.query.get();
    const documents = docRef.docs;
    return documents.map(document => document.data());
  }

  async getById(id) {
    const docRef = this.query.doc(`${id}`);
    const document = await docRef.get();
    return document.data();
  }

  async save(payload) {
    const newMessage = { 
      id: uuid(),
      ...payload
    };
    const docRef = this.query.doc(`${newMessage.id}`);
    await docRef.set(newMessage);
    return newMessage;
  }

  async update(id, payload) {
    const docRef = this.query.doc(`${id}`);
    await docRef.update(payload);
  }

  async deleteById(id) {
    const docRef = this.query.doc(`${id}`);
    await docRef.delete();
  }
}

module.exports = FirebaseContainer;