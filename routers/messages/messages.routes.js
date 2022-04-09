const express = require('express');
const { 
  getMessagesController, 
  getMessageByIdController, 
  saveMessageController, 
  updateMessageController, 
  deleteMessageController,
} = require('../../controllers/messages/messages.controllers');
const errorMiddleware = require('../../middlewares/errorMiddleware');

const router = express.Router();

// Routes
router.get('/', getMessagesController);
router.get('/:id', getMessageByIdController);
router.post('/', saveMessageController);
router.put('/:id', updateMessageController);
router.delete('/:id', deleteMessageController);

// error middleware
router.use(errorMiddleware);


module.exports = router;