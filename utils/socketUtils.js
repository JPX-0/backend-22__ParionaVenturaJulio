const socketIo = require(`socket.io`);
const FirebaseContainer = require("../models/containers/FirebaseContainer");
const { messageBot, formatMessage } = require("./formatMessage");
const { normalize, schema } = require("normalizr");
const firebaseApi = new FirebaseContainer("messages")


exports.sio = server => {
  return socketIo(server, {
    transport: [`polling`],
    cors: { origin: `*` }
  })
}

exports.connection = io => {
  io.on(`connection`, socket => {
    socket.on(`join-chat`, async ({ id }) => {
      const chats = await firebaseApi.getAll();
      const dataMessages = { id: "messages", messages: chats };
      
      const user = new schema.Entity("user");
      const article = new schema.Entity("article", {
        author: user
      });
      const post = new schema.Entity("message", {
        messages: [article]
      });

      // --- Objeto Normalizado ---
      const normalizedData = normalize(dataMessages, post);

      const normalized = (JSON.stringify(normalizedData).length * 100) / JSON.stringify(dataMessages).length;
      io.emit(`view-compresion`, { normalized: 100 - normalized }); // Se necesita mas de 200 mensajes para ver cuanto se comprime...

      // get-messages -- envia todos los mensajes.
      socket.emit(`get-messages`, normalizedData.result, normalizedData.entities);

      // chat-message -- envía un mensaje a quien ingrese a la página.
      socket.emit(`chat-message`, messageBot(`Bienvenido`, id));
      // chat-message -- envía un mensaje a todos menos a quien ingresó a la página.
      socket.broadcast.emit(`chat-message`, messageBot(`se unió al chat`, id));
    });
    
    socket.on(`read-writing`, ({ id, renderOnOff }) => {
      // show-writing -- envía un mensaje a todos menos a quien está escribiendo.
      socket.broadcast.emit(`show-writing`, messageBot(`está`, id), renderOnOff);
    });
  
    socket.on(`new-message`, async ({ id, name, lastname, age, avatar, alias, text }) => {
      const user = { id, name, lastname, age, avatar, alias };
      const newMessage = await firebaseApi.save(formatMessage(user, text));
      // chat-message -- envía un mensaje a todos.
      io.emit(`chat-message`, newMessage);
    })
  })
}