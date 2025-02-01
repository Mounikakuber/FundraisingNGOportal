document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;
    
    appendMessage('user-message', userInput);
    
    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        appendMessage('bot-message', botResponse);
    }, 1000);
    
    document.getElementById('user-input').value = '';
}

function appendMessage(className, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight;
}

function getBotResponse(input) {
    const responses = {
        "hello": "Hi there!",
        "how are you": "I'm just a dummy bot, but I'm doing fine!",
        "bye": "Goodbye!"
    };
    return responses[input.toLowerCase()] || "Hi!! how can i help you?";
}
