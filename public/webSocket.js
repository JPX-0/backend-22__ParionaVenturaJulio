const socket = io.connect();

// CHAT EVENTS
window.addEventListener(`click`, () => {
  if(data_is_valid && !count) {
    socket.emit(`join-chat`, { name: userName.value });
    count++;
  }
})

inputChat.addEventListener(`keyup`, () => {
  if(inputChat.value.length !== 0) renderOnOff = true;
  else renderOnOff = false;
  // read-writing -- envía una señal de que alguien está o no escribiendo algo.
  socket.emit(`read-writing`, { name: userName.value, renderOnOff });
});
submitChat.addEventListener(`click`, () => {
  if(inputChat.value.length > 0) {
    const text = inputChat.value;
    const name = userName.value;
    const lastname = userLastame.value;
    const age = userAge.value;
    const avatar = userAvatar.value;
    const alias = userAlias.value;
    // new-message -- envía el mensaje ingresado por el input.
    socket.emit(`new-message`, { name, lastname, age, avatar, alias, text });
    inputChat.value = ``;
    renderOnOff = false;
    // read-writing -- envía una señal de que alguien está o no escribiendo algo.
    socket.emit(`read-writing`, { name, renderOnOff });
  }
});
changeName.addEventListener(`click`, () => {
  renderOnOff = false;
  // read-writing -- envía una señal de que alguien está o no escribiendo algo.
  socket.emit(`read-writing`, { name: userName.value, renderOnOff });
});

socket.on(`send-product`, (data) => {
  // let userActual = JSON.parse(localStorage.getItem(`user`));
  renderNewProduct(userName, data);
});

socket.on(`get-messages`, data => {
  // let userActual = JSON.parse(localStorage.getItem(`user`));
  eachRenderMessage(data);
});

socket.on(`chat-message`, data => {
  // let userActual = JSON.parse(localStorage.getItem(`user`));
  renderMessage(data);
  setTimeout(() => {
    windowChat.scrollTop = windowChat.scrollHeight;
  }, 50);
});

socket.on(`show-writing`, (data, renderOnOff) => {
  renderWriting(data, renderOnOff);
})