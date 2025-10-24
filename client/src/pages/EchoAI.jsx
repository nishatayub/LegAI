import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { IoSend, IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { chatAPI, authHelpers, API_URL } from '../utils/api.js';

const EchoAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const token = authHelpers.getToken();

  // Load existing chat on component mount
  useEffect(() => {
    const loadChat = async () => {
      if (!token) {
        console.log('No token available for chat loading');
        return;
      }
      
      try {
        setLoading(true);
        const response = await chatAPI.getChats(token);
        console.log('Chat loading response:', response);
        if (response.success && response.data && response.data.length > 0) {
          // Use the first chat if available
          const existingChat = response.data[0];
          setChatId(existingChat._id);
          setMessages(existingChat.messages || []);
          console.log('Loaded existing chat:', existingChat._id);
        } else {
          // Create a new chat if none exists
          const newChatResponse = await chatAPI.createChat(token, 'Legal Consultation');
          console.log('New chat creation response:', newChatResponse);
          if (newChatResponse.success) {
            setChatId(newChatResponse.data._id);
            setMessages([]);
            console.log('Created new chat:', newChatResponse.data._id);
          } else {
            console.error('Failed to create new chat:', newChatResponse.message);
          }
        }
      } catch (error) {
        console.error('Error loading chat:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChat();
  }, [token]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || !chatId || !token || loading) {
      console.log('Message send conditions not met:', {
        hasInput: !!inputMessage.trim(),
        hasChatId: !!chatId,
        hasToken: !!token,
        isLoading: loading
      });
      return;
    }

    try {
      setLoading(true);
      
      // Add user message to UI immediately
      const userMessage = {
        _id: Date.now().toString(), // temporary ID
        sender: authHelpers.getUser()?._id || 'user',
        text: inputMessage,
        senderType: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      const messageToSend = inputMessage;
      setInputMessage('');

      // Send message to backend to save
      const saveResponse = await chatAPI.sendMessage(token, chatId, messageToSend, 'user');
      if (!saveResponse.success) {
        console.error('Failed to save user message:', saveResponse.message);
      }

      // Call Groq API for AI response
      try {
        // Using fetch to call our backend endpoint that will use Groq
        const aiResponse = await fetch(`${API_URL}/groq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: messageToSend,
            chatId: chatId
          })
        });
        
        const aiResponseData = await aiResponse.json();
        
        if (aiResponseData.success) {
          const aiMessage = {
            _id: Date.now().toString() + '-ai', // temporary ID
            sender: 'ai',
            text: aiResponseData.response,
            senderType: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
          
          // Save AI message to backend
          const aiSaveResponse = await chatAPI.sendMessage(token, chatId, aiResponseData.response, 'ai');
          if (!aiSaveResponse.success) {
            console.error('Failed to save AI message:', aiSaveResponse.message);
          }
        } else {
          throw new Error(aiResponseData.message || 'Failed to get AI response');
        }
      } catch (groqError) {
        console.error('Error calling Groq API:', groqError);
        
        // Add error message to UI
        const errorMessage = {
          _id: Date.now().toString() + '-error',
          sender: 'system',
          text: 'Sorry, I encountered an error processing your request. Please try again.',
          senderType: 'system',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F3F0] overflow-hidden font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-5 bg-[#F5F3F0] border-b border-[#EAE4DC] flex-shrink-0">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F5F3F0] border border-[#5C2E2E]/30 rounded-lg cursor-pointer text-sm font-semibold text-[#5C2E2E] hover:border-[#7D4545] hover:bg-[#5C2E2E]/10 transition-all duration-200" onClick={() => { window.location.href = '/'; }} title="Go to Landing Page">
          <span>LegAI</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => {
              authHelpers.clearAuth();
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-[#F5F3F0] border border-[#5C2E2E]/30 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[#5C2E2E]/10 hover:border-[#7D4545] transition-all duration-200 text-[#5C2E2E] font-medium text-sm"
            title="Logout"
          >
            <IoLogOutOutline size={18} />
            <span>Logout</span>
          </button>
          <div className="w-9 h-9 rounded-lg overflow-hidden border-[#5C2E2E]/30 cursor-pointer hover:border-[#7D4545] transition-all duration-20">
            <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 flex-col px-8 pb-4 overflow-y-auto w-full scrollbar-thin scrollbar-thumb-[#7D4545]/60 scrollbar-track-[#F5F3F0] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <div className="max-w-[1000px] mx-auto w-full">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center mb-8 mt-12">
            <h1 className="text-[44px] font-bold text-[#5C2E2E] mb-2 tracking-[-1.5px] leading-tight">Hello, {authHelpers.getUser()?.name || 'User'}</h1>
            <h2 className="text-[44px] font-light text-[#7D4545] mb-4 tracking-tight leading-tight">Ask me about legal matters.</h2>
            <p className="text-[15px] text-[#7D4545]/80 leading-relaxed font-normal">I'm your personal AI legal assistant</p>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-[650px] mx-auto pt-8 pb-4 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={msg._id || i} className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${msg.senderType === 'user' ? 'bg-[#7D4545] text-white' : msg.senderType === 'system' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-white text-[#5C2E2E] border border-[#5C2E2E]/10'}`}>
                  {msg.senderType === 'ai' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          code: ({inline, ...props}) => (
                            inline ?
                              <code className="bg-[#5C2E2E]/10 px-1.5 py-0.5 rounded text-xs font-mono" {...props} /> :
                              <code className="block bg-[#5C2E2E]/5 p-3 rounded-lg text-xs font-mono my-2 overflow-x-auto" {...props} />
                          ),
                          ul: ({...props}) => <ul className="list-disc pl-4 my-2 space-y-1" {...props} />,
                          ol: ({...props}) => <ol className="list-decimal pl-4 my-2 space-y-1" {...props} />,
                          li: ({...props}) => <li className="my-1" {...props} />,
                          h1: ({...props}) => <h1 className="text-lg font-bold my-2" {...props} />,
                          h2: ({...props}) => <h2 className="text-base font-bold my-2" {...props} />,
                          h3: ({...props}) => <h3 className="text-sm font-bold my-2" {...props} />,
                          strong: ({...props}) => <strong className="font-semibold" {...props} />,
                          em: ({...props}) => <em className="italic" {...props} />,
                          table: ({...props}) => <table className="border-collapse my-2" {...props} />,
                          thead: ({...props}) => <thead className="bg-gray-100" {...props} />,
                          tbody: ({...props}) => <tbody {...props} />,
                          tr: ({...props}) => <tr className="border-b border-gray-300" {...props} />,
                          th: ({...props}) => <th className="px-3 py-2 text-left font-semibold" {...props} />,
                          td: ({...props}) => <td className="px-3 py-2" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-[650px] mx-auto mb-8">
        <div className="relative bg-white border border-[#5C2E]/20 rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-[#7D4545] hover:shadow-lg focus-within:border-[#7D4545] focus-within:shadow-[0_4px_16px_rgba(92,46,46,0.10)] transition-all duration-300 shadow-sm">
          <textarea
            placeholder="Ask about legal matters..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 outline-none text-[15px] text-[#5C2E2E] bg-transparent font-normal placeholder:text-[#7D4545]/60 resize-none max-h-32"
            rows="1"
            disabled={loading}
          />
          <div className="flex items-center gap-2">
            <button 
              className={`w-8 h-8 border-0 rounded-lg flex items-center justify-center transition-all duration-200 text-white ${loading || !inputMessage.trim() ? 'bg-[#C9BDB9] cursor-not-allowed opacity-70' : 'bg-[#7D4545] hover:bg-[#5C2E2E] hover:scale-105 active:scale-95'}`} 
              onClick={handleSend} 
              aria-label="Send" 
              disabled={loading || !inputMessage.trim()}
              aria-disabled={loading || !inputMessage.trim()}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              ) : (
                <IoSend size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EchoAI;
