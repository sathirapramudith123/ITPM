import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Need help? Ask me anything!' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: `🤖 You said: "${input}"` }
      ]);
    }, 600);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 overflow-hidden animate-fade-in">
          <div className="bg-blue-600 text-white px-4 py-2 font-bold">
            🤖 ChatBot
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`px-3 py-2 rounded-lg text-sm max-w-xs
                  ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex border-t">
            <input
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;
