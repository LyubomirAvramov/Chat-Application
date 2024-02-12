const time_to_show_login = 400;
const time_to_hidden_login = 200;

function change_to_login() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
  document.querySelector('.cont_form_login').style.display = "block";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";               

  setTimeout(function(){  
    document.querySelector('.cont_form_login').style.opacity = "1"; 
  }, time_to_show_login);  
  
  setTimeout(function(){    
    document.querySelector('.cont_form_sign_up').style.display = "none";
  }, time_to_hidden_login);  
}

const time_to_show_sign_up = 100;
const time_to_hidden_sign_up = 400;

function change_to_sign_up() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
  document.querySelector('.cont_form_login').style.opacity = "0";
  
  setTimeout(function(){  
    document.querySelector('.cont_form_sign_up').style.opacity = "1";
  }, time_to_show_sign_up);  

  setTimeout(function(){   
    document.querySelector('.cont_form_login').style.display = "none";
  }, time_to_hidden_sign_up);  
}

const time_to_hidden_all = 500;

function hidden_login_and_sign_up() {
  document.querySelector('.cont_forms').className = "cont_forms";  
  document.querySelector('.cont_form_sign_up').style.opacity = "0";               
  document.querySelector('.cont_form_login').style.opacity = "0"; 

  setTimeout(function(){
    document.querySelector('.cont_form_sign_up').style.display = "none";
    document.querySelector('.cont_form_login').style.display = "none";
  }, time_to_hidden_all);  
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('User logged in:', username);
}

const users = ['User1', 'User2', 'User3'];
const chatRooms = ['General', 'Room1', 'Room2'];

const messages = {};
const messageHistory = {};

users.forEach(user => {
    messages[user] = {};
    messageHistory[user] = {};

    chatRooms.forEach(room => {
        messages[user][room] = [];
        messageHistory[user][room] = [];
    });
});

let currentUser = 'User1';
let currentChatRoom = 'General';

function updateUserList() {
    const userListElement = document.getElementById('user-list-content');
    userListElement.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user;
        listItem.onclick = () => switchUser(user);
        userListElement.appendChild(listItem);
    });
}

function updateChatArea() {
    const chatAreaElement = document.getElementById('chat-content');
    chatAreaElement.innerHTML = '';

    messages[currentUser][currentChatRoom].forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.user}: ${message.content}`;
        chatAreaElement.appendChild(messageElement);
    });

    // Auto-scroll to the bottom of the chat area
    chatAreaElement.scrollTop = chatAreaElement.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const newMessage = {
        user: currentUser,
        content: messageInput.value,
    };

    messages[currentUser][currentChatRoom].push(newMessage);
    messageHistory[currentUser][currentChatRoom].push(newMessage);

    const responseMessage = {
        user: 'ChatBot',
        content: 'Thinking... (delayed response)',
    };

    messages[currentUser][currentChatRoom].push(responseMessage);
    messageHistory[currentUser][currentChatRoom].push(responseMessage);

    updateChatArea();
    messageInput.value = '';

    setTimeout(() => {
        const actualResponse = {
            user: 'ChatBot',
            content: `Thanks for your message: "${newMessage.content}"`,
        };
        messages[currentUser][currentChatRoom].pop();
        messages[currentUser][currentChatRoom].push(actualResponse);
        messageHistory[currentUser][currentChatRoom].push(actualResponse);
        updateChatArea();
    }, 1500);
}

function switchChatRoom(chatRoom) {
    currentChatRoom = chatRoom;
    document.getElementById('current-room').textContent = chatRoom; // Update current room display
    updateChatArea();
}

function switchUser(user) {
    currentUser = user;
    updateChatArea();
}

// Initial update of user list and chat area
updateUserList();
updateChatArea();
