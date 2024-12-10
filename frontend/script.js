const API_URL = 'http://localhost:5000';
let token = '';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    token = data.token;
    loadChat();
  } else {
    alert('Login failed');
  }
}

async function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    alert('Signup successful');
  } else {
    alert('Signup failed');
  }
}

async function loadChat() {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('chat').style.display = 'block';

  const response = await fetch(`${API_URL}/chat/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const data = await response.json();
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = data.messages
      .map(msg => `<p><strong>${msg.role}:</strong> ${msg.content}</p>`)
      .join('');
  }
}

async function sendMessage() {
  const message = document.getElementById('message').value;
  document.getElementById('message').value = '';

  const response = await fetch(`${API_URL}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role: 'user', content: message }),
  });

  if (response.ok) {
    loadChat();
  }
}
