const FirebaseMessagesDao = require('../../models/daos/menssages/FirebaseMessagesDao');

const MessagesApi = new FirebaseMessagesDao();

const getMessagesController = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, result: await MessagesApi.getAll() });
  }
  catch(error) {
    next(error.message);
  }
}

const getMessageByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(id && isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
    const productsResponse = await productsApi.getById(id); 
    res.status(200).json({ success: true, result: productsResponse });
  }
  catch(error) {
    next(error.message);
  }
}

const saveMessageController = (req, res, next) => {
  try {
    const MessageItem = req.body;
    res.json(MessagesApi.save(MessageItem))
  }
  catch(error) {
    next(error.message);
  }
}

const updateMessageController = (req, res, next) => {
  try {
    const { id } = req.params;
    const MessageItem = req.body;
    res.json(MessagesApi.update(id, MessageItem));
  }
  catch(error) {
    next(error.message);
  }
}

const deleteMessageController = (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(MessagesApi.delete(id));
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