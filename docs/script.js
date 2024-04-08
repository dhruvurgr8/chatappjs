const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const userForm = document.querySelector(".user-form");
const userContainer = document.querySelector(".user-container");
const chatContainer = document.querySelector(".chat-container");
const greetUser = document.querySelector(".greet-user");
let username = localStorage.getItem("username");
const userStatus = document.querySelector(".user-status");
const logoutBtn = document.querySelector(".logout-btn");
// const typingIndicator = document.getElementById("typingIndicator");

//add logout btn
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  location.reload();
});

// Display chat page to user when he enters the username
function displayChatPage() {
  userContainer.style.display = "none";
  chatContainer.style.display = "flex";
  greetUser.textContent = `Welcome, ${username}`;
}
if (username) {
  displayChatPage();
}

// getting the username from the user
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  username = userForm.username.value;
  if (username != "") {
    localStorage.setItem("username", username);
    displayChatPage();
    console.log(username);
  }
});

// getting the messages from the user
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    let data = { username: username, message: input.value };
    socket.emit("message", data); // emitting message to server
    input.value = "";
  }
});
// Recieving messages from the server
socket.on("message", (data) => {
  const item = document.createElement("li");
  item.innerHTML = `<div class="user-messages">
    <span class="connected-username">${data.username} :</sapn> <span class="sent-message">${data.message}</sapn>
  </div>`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// adding the typing functionality
// input.addEventListener("input", () => {
//   console.log("User is typing...");
//   socket.emit("typing");
// });

// input.addEventListener("blur", () => {
//   console.log("User stopped typing...");
//   socket.emit("stopped typing");
// });

// socket.on("typing", (user) => {
//   typingIndicator.textContent = `${user} is typing...`;
// });
