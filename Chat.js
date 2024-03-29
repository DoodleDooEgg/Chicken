var firebaseConfig = {
  apiKey: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  authDomain: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  databaseURL: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  projectId: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  storageBucket: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  messagingSenderId: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
  appId: "xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  // auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${username === messages.username ? "sent" : "receive"}><span>${messages.username}: </span>${messages.message}</li>`;
  
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
