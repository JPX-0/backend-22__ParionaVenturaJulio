const socket = io.connect();

// CHAT EVENTS
window.addEventListener(`click`, () => {
  if(data_is_valid && !count) {
    // join-chat - envía el email del usuario que acaba de ingresar.
    socket.emit(`join-chat`, { id: userEmail.value });
    count++;
  }
})

inputChat.addEventListener(`keyup`, () => {
  if(inputChat.value.length !== 0) renderOnOff = true;
  else renderOnOff = false;
  // read-writing -- envía una señal de que alguien está o no escribiendo algo.
  socket.emit(`read-writing`, { id: userEmail.value, renderOnOff });
});
submitChat.addEventListener(`click`, () => {
  if(inputChat.value.length > 0) {
    const text = inputChat.value;
    const id = userEmail.value;
    const name = userName.value;
    const lastname = userLastame.value;
    const age = userAge.value;
    const avatar = userAvatar.value;
    const alias = userAlias.value;
    // new-message -- envía el mensaje ingresado por el input.
    socket.emit(`new-message`, { id, name, lastname, age, avatar, alias, text });
    inputChat.value = ``;
    renderOnOff = false;
    // read-writing -- envía una señal de que alguien está o no escribiendo algo.
    socket.emit(`read-writing`, { id, renderOnOff });
  }
});
changeName.addEventListener(`click`, () => {
  renderOnOff = false;
  // read-writing -- envía una señal de que alguien está o no escribiendo algo.
  socket.emit(`read-writing`, { id: userEmail.value, renderOnOff });
});

socket.on(`get-messages`, (result, entities) => {
  const user = new normalizr.schema.Entity("user");
  const article = new normalizr.schema.Entity("article", {
    author: user
  });
  const post = new normalizr.schema.Entity("message", {
    messages: [article]
  });
  // --- Objeto Denormalizado ---
  const denormalizedBlogpost = normalizr.denormalize(result, post, entities);
  eachRenderMessage(denormalizedBlogpost.messages);
});

socket.on(`chat-message`, data => {
  renderMessage(data);
  setTimeout(() => {
    windowChat.scrollTop = windowChat.scrollHeight;
  }, 50);
});

socket.on(`show-writing`, (data, renderOnOff) => {
  renderWriting(data, renderOnOff);
})

socket.on(`view-compresion`, ({ normalized }) => {
  const compression = document.querySelector("#compression");
  compression.textContent = `${normalized}%`;
})