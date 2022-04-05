const FirebaseContainer = require('../../containers/FirebaseContainer');

class FirebaseMessagesDao extends FirebaseContainer {
  constructor() {
    super('messages');
  }
}

module.exports = FirebaseMessagesDao;