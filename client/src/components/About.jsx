import React from 'react';

const About = () => {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Trusted Expertise',
      description: 'Built on comprehensive legal databases and verified by legal professionals.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Instant Results',
      description: 'Get accurate legal insights in seconds, not hours of manual research.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 12h8M8 8h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Comprehensive Coverage',
      description: 'Access to case law, statutes, regulations, and legal commentary worldwide.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Always Learning',
      description: 'AI continuously updated with the latest legal developments and precedents.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#101820] mb-4">
            About <span className="text-[#4C9F70]">LegAI</span>
          </h2>
          <p className="text-base text-[#6E7F80] leading-relaxed">
            LegAI is revolutionizing legal research by combining cutting-edge artificial intelligence 
            with comprehensive legal knowledge. We empower legal professionals, students, and individuals 
            to access accurate legal information faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-[#EAE4DC]/30 rounded-2xl p-6 hover:bg-white hover:shadow-xl border border-[#6E7F80]/20 hover:border-[#4C9F70] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-[#4C9F70] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#101820] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#6E7F80] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-br from-[#101820] to-[#2d3842] rounded-3xl p-10 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">99.5%</p>
              <p className="text-[#EAE4DC] text-sm">Accuracy Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-[#EAE4DC] text-sm">Availability</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">150+</p>
              <p className="text-[#EAE4DC] text-sm">Jurisdictions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
