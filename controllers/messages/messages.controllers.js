const { MessagesDao } = require('../../models/daos');
const moment = require('moment');

const messagesApi = new MessagesDao();

const validate = (value, num) => {
  if(!value) return true;
  if(value == "") return true;
  if(value.length < num) return true;
}

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
    if(!productsResponse) return res.status(404).json({ success: false, error: "ID not Found" });
    res.status(200).json({ success: true, result: productsResponse });
  }
  catch(error) {
    next(error.message);
  }
}

const saveMessageController = async (req, res, next) => {
  try {
    const { id, name, lastname, age, avatar, alias, text } = req.body;
    if(validate(id, 3) || validate(name, 3) || validate(lastname, 3) || validate(age, 1) || validate(avatar, 3) || validate(alias, 3) || validate(text, 1)) return res.status(400).json({ success: false, error: `Wrong body format` });
    const messageItem = {
      author: { id, name, lastname, age, avatar, alias },
      time: `[${moment().format('L')} ${moment().format('LTS')}]`,
      text
    }
    await messagesApi.save(messageItem);
    res.status(200).json({ success: true, result: `Message correctly stored` });
  }
  catch(error) {
    next(error.message);
  }
}

const updateMessageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productsResponse = await messagesApi.getById(id);
    if(!productsResponse) return res.status(404).json({ success: false, error: "ID not Found" });
    const { text } = req.body;
    if(validate(text, 1)) return res.status(400).json({ success: false, error: `Wrong body format` });
    await messagesApi.update(id, { text });
    res.status(200).json({ success: true, result: `Message updated successfully` });
  }
  catch(error) {
    next(error.message);
  }
}

const deleteMessageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productsResponse = await messagesApi.getById(id);
    if(!productsResponse) return res.status(404).json({ success: false, error: "ID not Found" });
    await messagesApi.deleteById(id);
    res.status(200).json({ success: true, result: `Message correctly eliminated` });
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