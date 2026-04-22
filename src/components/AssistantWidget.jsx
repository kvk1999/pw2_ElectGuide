import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Vote, Calendar, MapPin, Info, ChevronRight } from 'lucide-react';

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! I am your Election Guide. How can I help you understand the voting process today?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I can help with voter registration, polling locations, or election timelines. What specific info do you need?";
      
      const lowerInput = newUserMsg.text.toLowerCase();
      if (lowerInput.includes('register') || lowerInput.includes('registration')) {
        botResponse = "To register, you need to be a citizen and 18 years old. The deadline for the upcoming election is October 15th. You can register online or by mail.";
      } else if (lowerInput.includes('where') || lowerInput.includes('location') || lowerInput.includes('poll')) {
        botResponse = "Your polling location depends on your registered address. Let me guide you to the Map section to find your exact voting center.";
      } else if (lowerInput.includes('when') || lowerInput.includes('date') || lowerInput.includes('time')) {
        botResponse = "Election Day is November 5th. Early voting starts on October 20th. Polls are open from 7 AM to 8 PM.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    }, 1000);
  };

  const quickReplies = [
    "How to register?",
    "When is election day?",
    "Find my polling place"
  ];

  const handleQuickReply = (text) => {
    setInputValue(text);
    // Let the user hit send themselves or we could auto-send.
    // For this demo, let's auto-send.
    setTimeout(() => {
       document.getElementById('chat-form-submit').click();
    }, 100);
  };

  return (
    <div className="assistant-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="chat-panel glass"
          >
            <div className="chat-header">
              <div className="timeline-icon-wrapper" style={{ width: '30px', height: '30px', marginBottom: 0, position: 'static', transform: 'none', borderColor: 'var(--primary)', background: 'var(--primary-light)' }}>
                <Vote size={16} color="var(--primary)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem' }}>Election Guide</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>● Online</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className={`message ${msg.type}`}
                >
                  {msg.text}
                </motion.div>
              ))}
              
              {messages.length === 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {quickReplies.map((reply, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setInputValue(reply);
                        // Hacky auto-submit for demo
                        setTimeout(() => document.getElementById('chat-form-submit')?.click(), 50);
                      }}
                      className="btn-outline"
                      style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '999px', cursor: 'pointer' }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="chat-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask anything..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" id="chat-form-submit">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="assistant-btn"
        style={{ marginTop: isOpen ? '1rem' : 0 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default AssistantWidget;
