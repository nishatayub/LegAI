import React, { useState } from 'react';

const EchoAI = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="flex w-full h-screen bg-[#EAE4DC] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#101820] text-white flex flex-col h-screen p-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#4C9F70] rounded-full flex items-center justify-center text-white flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">EchoAI</span>
          </div>
          <button className="bg-transparent border-0 text-white cursor-pointer p-1.5 rounded-md hover:bg-white/10 transition-all duration-200 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="14" height="2" fill="currentColor" rx="1"/>
              <rect x="3" y="9" width="14" height="2" fill="currentColor" rx="1"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1 mb-7">
          <button className="flex items-center gap-3 px-3 py-2.5 bg-transparent border-0 text-white cursor-pointer rounded-lg hover:bg-white/8 transition-all duration-200 text-sm font-normal text-left w-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="flex-1">New chat</span>
            <span className="text-[11px] text-white/50 bg-white/10 px-1.5 py-0.5 rounded ml-auto font-medium">⌘ N</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 bg-transparent border-0 text-white cursor-pointer rounded-lg hover:bg-white/8 transition-all duration-200 text-sm font-normal text-left w-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 15l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="flex-1">Search chat</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 bg-transparent border-0 text-white cursor-pointer rounded-lg hover:bg-white/8 transition-all duration-200 text-sm font-normal text-left w-full">
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
            <div className="px-3 py-2.5 bg-white/[0.04] rounded-lg text-[13px] text-white/70 cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis">Quick access to your lates...</div>
            <div className="px-3 py-2.5 bg-white/[0.04] rounded-lg text-[13px] text-white/70 cursor-pointer hover:bg-white/10 hover:text-white transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis">Pick up right where you le...</div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="bg-white/5 rounded-xl p-4 mb-3 border border-white/[0.08]">
            <p className="text-sm font-semibold mb-1.5 text-white">Your trial ends in 7 days</p>
            <p className="text-xs text-white/65 leading-relaxed mb-3.5">
              Keep enjoying unlimited chats, detailed reports, and premium AI tools without interruption.
            </p>
            <button className="w-full bg-[#4C9F70] text-white border-0 px-4 py-2.5 rounded-lg text-sm font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-[#3d8059] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upgrade
            </button>
          </div>

          <div className="flex flex-col gap-0.5">
            <button className="flex items-center gap-2.5 px-3 py-2 bg-transparent border-0 text-white/60 cursor-pointer rounded-md hover:bg-white/5 hover:text-white/90 transition-all duration-200 text-[13px] text-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 opacity-70">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="flex-shrink-0 opacity-70">Help Center</span>
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 bg-transparent border-0 text-white/60 cursor-pointer rounded-md hover:bg-white/5 hover:text-white/90 transition-all duration-200 text-[13px] text-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 opacity-70">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="flex-shrink-0 opacity-70">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        <header className="flex justify-between items-center px-8 py-5 bg-white border-b border-[#EAE4DC] flex-shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#6E7F80]/30 rounded-lg cursor-pointer text-sm font-semibold text-[#101820] hover:border-[#6E7F80] hover:bg-[#EAE4DC]/30 transition-all duration-200">
            <span>EchoAI 1.0</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="w-9 h-9 bg-white border border-[#6E7F80]/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#EAE4DC]/30 hover:border-[#6E7F80] transition-all duration-200 text-[#101820]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-9 h-9 bg-white border border-[#6E7F80]/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#EAE4DC]/30 hover:border-[#6E7F80] transition-all duration-200 text-[#101820]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
              </svg>
            </button>
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#6E7F80]/30 cursor-pointer hover:border-[#4C9F70] transition-all duration-200">
              <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-10 overflow-y-auto max-w-[1000px] mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-[44px] font-bold text-[#101820] mb-2 tracking-[-1.5px] leading-tight">Hello, Olivia Brooks</h1>
            <h2 className="text-[44px] font-light text-[#6E7F80] mb-4 tracking-tight leading-tight">Let's make your research easier.</h2>
            <p className="text-[15px] text-[#6E7F80] leading-relaxed font-normal">
              Your personal AI assistant for documents, research, and knowledge.
            </p>
          </div>

          <div className="w-full max-w-[650px] mb-10">
            <div className="relative bg-white border border-[#6E7F80]/30 rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-[#6E7F80] hover:shadow-lg focus-within:border-[#4C9F70] focus-within:shadow-[0_4px_16px_rgba(76,159,112,0.15)] transition-all duration-300 shadow-sm">
              <input
                type="text"
                placeholder="Ask Anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border-0 outline-none text-[15px] text-[#101820] bg-transparent font-normal placeholder:text-[#6E7F80]/60"
              />
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-transparent border-0 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#EAE4DC] hover:text-[#101820] transition-all duration-200 text-[#6E7F80]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="w-8 h-8 bg-transparent border-0 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#EAE4DC] hover:text-[#101820] transition-all duration-200 text-[#6E7F80]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v4M12 18v4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M2 12h4M18 12h4M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="w-8 h-8 bg-[#4C9F70] border-0 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3d8059] hover:scale-105 active:scale-95 transition-all duration-200 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12l14-7-7 14-2-7-5 0z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full max-w-[850px]">
            <div className="bg-white border border-[#6E7F80]/30 rounded-2xl px-5 py-6 hover:-translate-y-1 hover:shadow-2xl hover:border-[#4C9F70] transition-all duration-300 cursor-pointer flex flex-col gap-3">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-white flex-shrink-0 bg-[#4C9F70]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#101820] m-0 leading-snug">Legal Insights</h3>
              <p className="text-[13px] text-[#6E7F80] leading-relaxed m-0 font-normal">
                Explore the latest updates and key discussions on legal topics today.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-6 hover:-translate-y-1 hover:shadow-2xl hover:border-[#4C9F70] transition-all duration-300 cursor-pointer flex flex-col gap-3">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-black flex-shrink-0 bg-[#4C9F70]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 8h8M12 8v8M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#101820] m-0 leading-snug">Global Justice</h3>
              <p className="text-[13px] text-[#6E7F80] leading-relaxed m-0 font-normal">
                Discover important trends and changes shaping international law.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-6 hover:-translate-y-1 hover:shadow-2xl hover:border-[#4C9F70] transition-all duration-300 cursor-pointer flex flex-col gap-3">
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-black flex-shrink-0 bg-[#4C9F70]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#101820] m-0 leading-snug">Modern Law & Technology</h3>
              <p className="text-[13px] text-[#6E7F80] leading-relaxed m-0 font-normal">
                Explore the latest updates and key discussions on legal topics today.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EchoAI;
