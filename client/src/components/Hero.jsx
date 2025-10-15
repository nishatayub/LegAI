import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-[#EAE4DC] via-white to-[#EAE4DC] pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4C9F70]/10 border border-[#4C9F70]/20 rounded-full">
              <span className="w-2 h-2 bg-[#4C9F70] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-[#4C9F70]">AI-Powered Legal Research</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[#101820] leading-tight">
              Your Personal AI
              <span className="block text-[#4C9F70]">Legal Assistant</span>
            </h1>

            <p className="text-base text-[#6E7F80] leading-relaxed max-w-xl">
              Navigate complex legal research with confidence. LegAI provides instant access to legal insights, 
              case law analysis, and expert guidance—all powered by advanced AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/echoai"
                className="px-8 py-4 bg-[#4C9F70] text-white rounded-xl font-semibold hover:bg-[#3d8059] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-center"
              >
                Start Free Trial
              </a>
              <a
                href="#help"
                className="px-8 py-4 bg-white border-2 border-[#6E7F80]/30 text-[#101820] rounded-xl font-semibold hover:border-[#4C9F70] hover:bg-[#EAE4DC]/30 transition-all duration-200 text-center"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#101820]">10K+</span>
                <span className="text-xs text-[#6E7F80]">Active Users</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#101820]">500K+</span>
                <span className="text-xs text-[#6E7F80]">Legal Queries</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#101820]">98%</span>
                <span className="text-xs text-[#6E7F80]">Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-[#6E7F80]/20">
              {/* Mock Chat Interface */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4C9F70] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                  <div className="flex-1 bg-[#EAE4DC]/50 rounded-2xl rounded-tl-none p-4">
                    <p className="text-sm text-[#101820]">
                      What are the legal implications of breach of contract in California?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1 bg-[#4C9F70]/10 rounded-2xl rounded-tr-none p-4 max-w-md">
                    <p className="text-sm text-[#101820]">
                      Under California law, breach of contract occurs when one party fails to perform...
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-[#6E7F80] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    U
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4C9F70] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                  <div className="flex-1 bg-[#EAE4DC]/50 rounded-2xl rounded-tl-none p-4">
                    <p className="text-sm text-[#101820]">
                      Can you provide relevant case precedents?
                    </p>
                  </div>
                </div>
              </div>

              {/* Typing Indicator */}
              <div className="flex items-center gap-2 mt-4 px-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#4C9F70] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[#4C9F70] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-[#4C9F70] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-xs text-[#6E7F80]">AI is typing...</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#4C9F70]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#4C9F70]/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#4C9F70]/5 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
