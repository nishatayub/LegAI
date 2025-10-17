import React from 'react';
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#F5F3F0] pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-[#5C2E2E] rounded-[40px] overflow-hidden min-h-[400px]">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-12 lg:p-20 h-full">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-wide">
                Your Personal<br />
                AI Legal Assistant
              </h1>

              <p className="text-[#E8D5D0] text-base leading-relaxed tracking-wide mt-6">
                Navigate complex legal research with confidence. LegAI provides instant access to legal insights,
                case law analysis, and expert guidance—all powered by advanced AI technology.
              </p>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="overflow-hidden flex items-center justify-center min-h-[400px] rounded-3xl">
                <img 
                  src={heroImage} 
                  alt="Legal AI Assistant" 
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
