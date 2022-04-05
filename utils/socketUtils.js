const socketIo = require(`socket.io`);
const FirebaseContainer = require("../models/containers/FirebaseContainer");
const { messageBot, formatMessage } = require("./formatMessage");
const util = require("util");
const { normalize, denormalize, schema } = require("normalizr");
// const path = require(`path`);
// const { promises : fs } = require("fs");
const firebaseApi = new FirebaseContainer("messages")


exports.sio = server => {
  return socketIo(server, {
    transport: [`polling`],
    cors: { origin: `*` }
  })
}

exports.connection = io => {
  io.on(`connection`, socket => {
    socket.on(`join-chat`, async ({ name }) => {
      const chats = await firebaseApi.getAll();
      const dataMessages = { id: "messages", posts: chats };

      // Definimos un esquema para la entiad empleado.
      const user = new schema.Entity("user");

      // Definimos un esquema para la entiad empresa.
      const article = new schema.Entity("article", {
        author: user
      });
      
      const post = new schema.Entity("post", {
        posts: [article]
      });

      // --- Objeto Normalizado ---
      const normalizedData = normalize(dataMessages, post);
      // console.log("normalizedData", util.inspect(normalizedData, false, 12, true));

      console.log("Longitud objeto original => ", JSON.stringify(dataMessages).length);
      console.log("Longitud objeto normalizado => ", JSON.stringify(normalizedData).length);

      // get-messages -- envia todos los mensajes.
      socket.emit(`get-messages`, chats);

      // chat-message -- envía un mensaje a quien ingrese a la página.
      socket.emit(`chat-message`, messageBot(`Bienvenido`, name));
      // chat-message -- envía un mensaje a todos menos a quien ingresó a la página.
      socket.broadcast.emit(`chat-message`, messageBot(`se unió al chat`, name));
    });
    
    socket.on(`read-writing`, ({ name, renderOnOff }) => {
      // show-writing -- envía un mensaje a todos menos a quien está escribiendo.
      socket.broadcast.emit(`show-writing`, messageBot(`está`, name), renderOnOff);
    });
  
    socket.on(`new-message`, async ({ name, lastname, age, avatar, alias, text }) => {
      const user = { name, lastname, age, avatar, alias };
      const chats = await firebaseApi.getAll();
      let newMessage;
      const findName = chats.map(e => ({ name: e.author.name, id: e.author.id }));
      console.log("findName", findName);
      const foundName = findName.find(e => e.name == name)
      if(foundName) {
        console.log("foundName", foundName);
        newMessage = await firebaseApi.save(formatMessage(foundName.id, user, text));
      } else {
        const newId = findName.length + 1;
        console.log("newId", newId);
        newMessage = await firebaseApi.save(formatMessage(newId, user, text));
      }
      console.log("newMessage", newMessage);
      // chat-message -- envía un mensaje a todos.
      io.emit(`chat-message`, newMessage);
    })
  })
}