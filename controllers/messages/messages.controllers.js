const { MessagesDao } = require('../../models/daos');

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

const saveMessageController = (req, res, next) => {
  try {
    const MessageItem = req.body;
    res.json(messagesApi.save(MessageItem));
  }
  catch(error) {
    next(error.message);
  }
}

const updateMessageController = (req, res, next) => {
  try {
    const { id } = req.params;
    const MessageItem = req.body;
    res.json(messagesApi.update(id, MessageItem));
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