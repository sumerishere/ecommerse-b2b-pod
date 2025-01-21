import React, { useState,useEffect } from 'react';
import { BotMessageSquare, Send, Minimize2, X, ChevronUp } from 'lucide-react';

const ChatbotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      content: 'Hello! How can I help you with your B2B needs today?',
      timestamp: new Date(),
      options: [
        { text: 'What Bulkify do?', handler: 'showBulkifyInfo' }
      ]
    }
  ]);


  useEffect(() => {
    // Listen for hide/show events
    const handleHide = () => setIsVisible(false);
    const handleShow = () => setIsVisible(true);

    window.addEventListener('HIDE_CHATBOT', handleHide);
    window.addEventListener('SHOW_CHATBOT', handleShow);

    return () => {
      window.removeEventListener('HIDE_CHATBOT', handleHide);
      window.removeEventListener('SHOW_CHATBOT', handleShow);
    };
  }, []);
  
  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleOptionClick = (handler) => {
    if (handler === 'showBulkifyInfo') {
      setChatHistory(prev => [...prev, 
        { 
          type: 'user', 
          content: 'What Bulkify do?',
          timestamp: new Date()
        },
        { 
          type: 'bot', 
          content: 'Bulkify is a leading B2B e-commerce platform that connects businesses worldwide. We provide seamless bulk ordering services, competitive wholesale pricing, and reliable supply chain solutions. Our platform helps businesses grow by simplifying procurement and expanding their market reach.',
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { 
        type: 'user', 
        content: message,
        timestamp: new Date()
      }]);
      // Simulate bot response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          type: 'bot', 
          content: 'Thanks for your message. A customer service representative will respond shortly.',
          timestamp: new Date()
        }]);
      }, 1000);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 mb-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
      >
        <BotMessageSquare className="w-6 h-6" />
      </button>
    );
  }

  

  // Return null if chatbot should be hidden
  if (!isVisible) return null;

  return (
    <div className={`fixed right-4 bottom-4 bg-white rounded-lg shadow-xl transition-all duration-300 ${
      isMinimized ? 'w-72 h-14' : 'w-80 h-96'
    }`}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BotMessageSquare className="w-5 h-5" />
          <span className="font-medium">Bulkify Support</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-blue-700 p-1 rounded"
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-blue-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-4">
            {chatHistory.map((msg, index) => (
              <div key={index}>
                <div
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      msg.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                </div>
                {msg.options && (
                  <div className="mt-2">
                    {msg.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option.handler)}
                        className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatbotContainer;