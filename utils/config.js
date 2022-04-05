const firebaseConfig = require('../db/firebase/firebase.config.json');

module.exports = {
  ENV: {
    PORT: process.env.PORT || 8080,
    PERS: process.env.PERS || 'firebase'
  },
  DB_CONFIG: {
    firebase: {
      credential: firebaseConfig
    }
  }
}