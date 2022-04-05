const moment = require('moment');

const formatMessage = (userId, user, text) => {
  return {
    author: {
      id: userId,
      ...user
    },
    time: `[${moment().format('L')} ${moment().format('LTS')}]`,
    text
  }
};
const messageBot = (text, name) => {
  return {
    bot: "_bot_",
    author: { name },
    text
  }
};

module.exports = {
  formatMessage,
  messageBot
}