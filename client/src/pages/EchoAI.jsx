import React, { useState } from 'react';

const predefinedReplies = [
  "Hello! How can I assist you with your legal research today?",
  "Here are some recent updates in international law.",
  "I'm here to help you draft legal documents or answer questions!",
  "For compliance, always check the latest regulations in your jurisdiction.",
  "Let me know if you need case law analysis or legal insights."
];

function createNewChat() {
  return {
    id: Date.now() + Math.random(),
    name: `Chat ${new Date().toLocaleTimeString()}`,
    messages: []
  };
}

const EchoAI = () => {
  const [chats, setChats] = useState([createNewChat()]);
  const [currentChatIdx, setCurrentChatIdx] = useState(0);
  const [message, setMessage] = useState('');
  const [editingIdx, setEditingIdx] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentChat = chats[currentChatIdx];
  const hasMessages = currentChat.messages.length > 0;

  function handleSend() {
    if (!message.trim()) return;
    const updatedChats = chats.map((chat, idx) => {
      if (idx !== currentChatIdx) return chat;
      return {
        ...chat,
        messages: [
          ...chat.messages,
          { sender: 'user', text: message }
        ]
      };
    });
    setChats(updatedChats);
    setMessage('');
    setTimeout(() => {
      const aiReply = predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)];
      setChats(chats => chats.map((chat, idx) => {
        if (idx !== currentChatIdx) return chat;
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: 'ai', text: aiReply }
          ]
        };
      }));
    }, 600);
  }

  function handleNewChat() {
    const newChat = createNewChat();
    setChats([newChat, ...chats]);
    setCurrentChatIdx(0);
  }

  function handleSelectChat(idx) {
    setCurrentChatIdx(idx);
  }

  function handleInputKeyDown(e) {
    if (e.key === 'Enter') handleSend();
  }

  function handleDeleteChat(idx) {
    if (chats.length === 1) return;
    const newChats = chats.filter((_, i) => i !== idx);
    let newIdx = currentChatIdx;
    if (idx === currentChatIdx) {
      newIdx = idx === 0 ? 0 : idx - 1;
    } else if (idx < currentChatIdx) {
      newIdx = currentChatIdx - 1;
    }
    setChats(newChats);
    setCurrentChatIdx(newIdx);
    setEditingIdx(null);
  }

  function handleStartRename(idx) {
    setEditingIdx(idx);
    setEditingName(chats[idx].name);
  }

  function handleRenameChange(e) {
    setEditingName(e.target.value);
  }

  function handleRenameSubmit(idx) {
    if (!editingName.trim()) return;
    setChats(chats => chats.map((chat, i) => i === idx ? { ...chat, name: editingName } : chat));
    setEditingIdx(null);
  }

  function handleRenameKeyDown(e, idx) {
    if (e.key === 'Enter') handleRenameSubmit(idx);
    if (e.key === 'Escape') setEditingIdx(null);
  }

  return (
    <div className="flex w-full h-screen bg-[#F5F3F0] overflow-hidden font-sans">
      {sidebarOpen && (
        <aside className="w-[260px] bg-[#5C2E2E] text-white flex flex-col h-screen p-4 flex-shrink-0 transition-all duration-300">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { window.location.href = '/'; }} title="Go to Landing Page">
              <div className="w-7 h-7 bg-[#F5F3F0] rounded-full flex items-center justify-center text-[#5C2E2E] flex-shrink-0 border border-[#5C2E2E]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">EchoAI</span>
            </div>
            <button className="bg-transparent border-0 text-white cursor-pointer p-1.5 rounded-md hover:bg-[#F5F3F0]/10 transition-all duration-200 flex items-center justify-center" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="14" height="2" fill="currentColor" rx="1"/>
                <rect x="3" y="9" width="14" height="2" fill="currentColor" rx="1"/>
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-1 mb-7">
            <button className="flex items-center gap-3 px-3 py-2.5 bg-transparent border-0 text-white cursor-pointer rounded-lg hover:bg-[#F5F3F0]/10 transition-all duration-200 text-sm font-normal text-left w-full" onClick={handleNewChat}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="flex-1">New chat</span>
              <span className="text-[11px] text-white/50 bg-white/10 px-1.5 py-0.5 rounded ml-auto font-medium">⌘ N</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 bg-transparent border-0 text-white cursor-pointer rounded-lg hover:bg-[#F5F3F0]/10 transition-all duration-200 text-sm font-normal text-left w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="flex-1">Search chat</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 bg-transparent border-0 text-white cursor-pointer rounded-lg hover:bg-[#F5F3F0]/10 transition-all duration-200 text-sm font-normal text-left w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="flex-1">Community</span>
            </button>
          </div>
          <div className="mb-5">
            <h3 className="text-[11px] font-semibold text-white/50 mb-2.5 px-3 uppercase tracking-wide">Recent</h3>
            <div className="flex flex-col gap-1">
              {chats.map((chat, idx) => (
                <div key={chat.id} className={`group flex items-center px-3 py-2.5 rounded-lg text-[13px] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200 ${idx === currentChatIdx ? 'bg-[#7D4545] text-white' : 'bg-[#F5F3F0]/10 text-white/70 hover:bg-[#F5F3F0]/20 hover:text-white'}`} onClick={e => { if (e.target.tagName === 'BUTTON' || e.target.tagName === 'svg' || e.target.tagName === 'INPUT') return; handleSelectChat(idx); }} title={chat.name}>
                  {editingIdx === idx ? (
                    <input className="bg-white/80 text-[#5C2E2E] rounded px-2 py-0.5 text-[13px] w-24 mr-2 outline-none border border-[#7D4545]/30" value={editingName} autoFocus onChange={handleRenameChange} onBlur={() => handleRenameSubmit(idx)} onKeyDown={e => handleRenameKeyDown(e, idx)} />
                  ) : (
                    <span className="flex-1 truncate" title={chat.name}>{chat.name}</span>
                  )}
                  <button className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[#F5F3F0]/20" title="Rename chat" onClick={e => { e.stopPropagation(); handleStartRename(idx); }} tabIndex={-1}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 0 0 .707-.293l9.414-9.414a1 1 0 0 0 0-1.414l-3.586-3.586a1 1 0 0 0-1.414 0l-9.414 9.414A1 1 0 0 0 4 20z"/></svg>
                  </button>
                  <button className={`ml-1 opacity-60 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[#F5F3F0]/20 ${chats.length === 1 ? 'cursor-not-allowed opacity-30' : ''}`} title={chats.length === 1 ? 'Cannot delete last chat' : 'Delete chat'} onClick={e => { e.stopPropagation(); if (chats.length > 1) handleDeleteChat(idx); }} tabIndex={-1} disabled={chats.length === 1}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-4">
            <div className="flex flex-col gap-0.5">
              <button className="flex items-center gap-2.5 px-3 py-2 bg-transparent border-0 text-white/60 cursor-pointer rounded-md hover:bg-[#F5F3F0]/10 hover:text-white/90 transition-all duration-200 text-[13px] text-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 opacity-70">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="flex-shrink-0 opacity-70">Help Center</span>
              </button>
              <button className="flex items-center gap-2.5 px-3 py-2 bg-transparent border-0 text-white/60 cursor-pointer rounded-md hover:bg-[#F5F3F0]/10 hover:text-white/90 transition-all duration-200 text-[13px] text-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 opacity-70">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="flex-shrink-0 opacity-70">Settings</span>
              </button>
            </div>
          </div>
        </aside>
      )}
      {!sidebarOpen && (
        <button className="fixed top-5 left-5 z-50 bg-[#5C2E2E] text-white p-2 rounded-lg shadow-lg hover:bg-[#7D4545] transition-all duration-200" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="7" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="15" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      )}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F5F3F0]">
        <header className="flex justify-between items-center px-8 py-5 bg-[#F5F3F0] border-b border-[#EAE4DC] flex-shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F5F3F0] border border-[#5C2E2E]/30 rounded-lg cursor-pointer text-sm font-semibold text-[#5C2E2E] hover:border-[#7D4545] hover:bg-[#5C2E2E]/10 transition-all duration-200">
            <span>EchoAI 1.0</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="w-9 h-9 bg-[#F5F3F0] border border-[#5C2E2E]/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#5C2E2E]/10 hover:border-[#7D4545] transition-all duration-200 text-[#5C2E2E]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-9 h-9 bg-[#F5F3F0] border border-[#5C2E2E]/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#5C2E2E]/10 hover:border-[#7D4545] transition-all duration-200 text-[#5C2E2E]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
              </svg>
            </button>
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#5C2E2E]/30 cursor-pointer hover:border-[#7D4545] transition-all duration-200">
              <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>
        <div className="flex-1 flex flex-col px-8 pb-10 overflow-y-auto max-w-[1000px] mx-auto w-full">
          {!hasMessages && (
            <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
              <h1 className="text-[44px] font-bold text-[#5C2E2E] mb-2 tracking-[-1.5px] leading-tight">Hello, Olivia Brooks</h1>
              <h2 className="text-[44px] font-light text-[#7D4545] mb-4 tracking-tight leading-tight">Let's make your research easier.</h2>
              <p className="text-[15px] text-[#7D4545]/80 leading-relaxed font-normal">Your personal AI assistant for documents, research, and knowledge.</p>
            </div>
          )}
          {hasMessages && (
            <div className="flex-1 w-full max-w-[650px] mx-auto pt-8 pb-4 flex flex-col gap-3">
              {currentChat.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow-sm ${msg.sender === 'user' ? 'bg-[#7D4545] text-white' : 'bg-white text-[#5C2E2E] border border-[#5C2E2E]/10'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
          )}
          <div className="w-full max-w-[650px] mx-auto mt-auto pt-4">
            <div className="relative bg-white border border-[#5C2E2E]/20 rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-[#7D4545] hover:shadow-lg focus-within:border-[#7D4545] focus-within:shadow-[0_4px_16px_rgba(92,46,46,0.10)] transition-all duration-300 shadow-sm">
              <input type="text" placeholder="Ask Anything..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleInputKeyDown} className="flex-1 border-0 outline-none text-[15px] text-[#5C2E2E] bg-transparent font-normal placeholder:text-[#7D4545]/60" />
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-[#5C2E2E] border-0 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#7D4545] hover:scale-105 active:scale-95 transition-all duration-200 text-white" onClick={handleSend} aria-label="Send">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12l14-7-7 14-2-7-5 0z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EchoAI;
