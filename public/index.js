// ASK FOR CHAT
const windowChat = document.querySelector(`.chat__container`);
const userEmail = document.querySelector(`#email`);
const userName = document.querySelector(`#name`);
const userLastame = document.querySelector(`#lastname`);
const userAge = document.querySelector(`#age`);
const userAvatar = document.querySelector(`#avatar`);
const userAlias = document.querySelector(`#alias`);
const changeName = document.querySelector(`#changeUserName`);
const submitChat = document.querySelector(`#messageButton`);
const inputChat = document.querySelector(`#messageInput`);
const messageBox = [submitChat, inputChat];
const dataUser = [userEmail, userName, userLastame, userAge, userAvatar, userAlias];

// GENERAL FUNCTIONS
const validate = e => e.value.length < 3;

// FUNCTIONS TO RENDER
const renderMessage = (data) => {
  const div = document.createElement(`div`);
  let html;
  if (!data.bot) {
    div.classList.add(`userMessage`);
    if (data.author.id === userEmail.value) {
      div.classList.add(`myUser`);
    } else {
      div.classList.add(`anotherUser`);
    }
    html = `
      <p><span class="bot__user">${data.author.id}</span> <span class="bot__time">${data.time}</span></p>
      <p>${data.text}</p>
    `;
  } else {
    div.classList.add(`bot`);
    html = `<p>${data.text} <span class="bot__user">${data.author.id}</span></p>`;
  }
  div.innerHTML = html;
  document.getElementById(`renderMessages`).appendChild(div);
};
const eachRenderMessage = (data) => {
  if(data.length > 0) {
    data.map(messages => renderMessage(messages));
  }
};
const renderWriting = (data, renderOnOff) => {
  let html;
  if(renderOnOff) {
    html= `
      <div class="bot">
        <p><span class="bot__user">${data.author.id}</span> ${data.text} <span class="bot__writing"></span></p>
      </div>
    `;
  } else {
    html = ``;
  }
  document.getElementById(`renderNotification`).innerHTML = html;
};

// GENERAL VARIABLES 
let renderOnOff;
let data_is_valid;
let count = 0;

// CHAT EVENTS
window.addEventListener(`keyup`, () => {
  if(validate(userName) || validate(userLastame) || userAge.value.length == 0 || validate(userAvatar) || validate(userAlias)){
    changeName.classList.add(`disabled`);
    changeName.setAttribute(`disabled`, `true`);
  } else {
    changeName.classList.remove(`disabled`);
    changeName.removeAttribute(`disabled`, `true`);
  }
});
inputChat.addEventListener(`keydown`, (e) => {
  if(e.keyCode === 13) submitChat.click();
});
changeName.addEventListener(`click`, () => {
  inputChat.value = ``;
  changeName.style.display = "none";
  messageBox.forEach(e => e.classList.toggle(`disabled`));
  messageBox.forEach(e => e.toggleAttribute(`disabled`));
  dataUser.forEach(e => e.classList.toggle(`disabled`));
  dataUser.forEach(e => e.toggleAttribute(`disabled`));
  data_is_valid = true;
});