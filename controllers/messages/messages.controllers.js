const { MessagesDao } = require('../../models/daos');
const moment = require('moment');

const messagesApi = new MessagesDao();

const getMessagesController = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, result: await messagesApi.getAll() });
  }
  catch(error) {
    next(error.message);
  }
}

const getMessageByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productsResponse = await messagesApi.getById(id); 
    res.status(200).json({ success: true, result: productsResponse });
  }
  catch(error) {
    next(error.message);
  }
}

const saveMessageController = async (req, res, next) => {
  try {
    const { id, name, lastname, age, avatar, alias, text } = req.body;
    if(id.length < 3 || name.length < 3 || lastname.length < 3 || age.length < 1 || avatar.length < 3 || alias.length < 3 || text.length < 1) return res.status(400).json({ success: false, error: `Wrong body format` });
    const messageItem = {
      author: { id, name, lastname, age, avatar, alias },
      time: `[${moment().format('L')} ${moment().format('LTS')}]`,
      text
    }
    res.status(200).json(await messagesApi.save(messageItem));
  }
  catch(error) {
    next(error.message);
  }
}

const updateMessageController = (req, res, next) => {
  try {
    const { id } = req.params;
    const messageItem = req.body;
    res.json(messagesApi.update(id, messageItem));
  }
  catch(error) {
    next(error.message);
  }
}

const deleteMessageController = (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(messagesApi.delete(id));
  }
  catch(error) {
    next(error.message);
  }
}

module.exports = {
  getMessagesController,
  getMessageByIdController,
  saveMessageController,
  updateMessageController,
  deleteMessageController,
}