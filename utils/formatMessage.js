const moment = require('moment');

const formatMessage = (user, text) => {
  return {
    author: { ...user },
    time: `[${moment().format('L')} ${moment().format('LTS')}]`,
    text
  }
};
const messageBot = (text, id) => {
  return {
    bot: "_bot_",
    author: { id },
    text
  }
};

module.exports = {
  formatMessage,
  messageBot
}