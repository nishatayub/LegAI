import React from 'react';
import aboutUsImage from '../assets/aboutUs.jpg';

const About = () => {
  return (
    <section id="about" className="py-10 bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#5C2E2E] mb-6 tracking-tight">
            Why Choose Us?
          </h2>
        </div>

        {/* Smaller Centered Image */}
        <div className="max-w-3xl max-h-80 mx-auto mb-16">
          <div className="bg-[#5C2E2E] rounded-3xl overflow-hidden shadow-xl">
            <img 
              src={aboutUsImage} 
              alt="About LegAI" 
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>

        {/* Prominent Centered Text Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xl lg:text-2xl font-semibold text-[#5C2E2E] leading-relaxed tracking-wide">
            LegAI is revolutionizing legal research by combining cutting-edge artificial intelligence 
            with comprehensive legal knowledge.
          </p>
          
          <p className="text-lg text-[#5C2E2E]/80 leading-relaxed">
            We empower legal professionals, students, and individuals to access accurate legal information 
            faster than ever before. Our AI-powered platform provides instant access to legal insights, 
            case law analysis, and expert guidance—making complex legal research simple and accessible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
