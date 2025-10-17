import React from 'react';

const HowWeHelp = () => {
  const helpItems = [
    {
      title: 'Legal Research',
      description: 'Quickly find relevant case law, statutes, and regulations across multiple jurisdictions.',
      gradient: 'from-[#5C2E2E] to-[#7D4545]',
    },
    {
      title: 'Case Analysis',
      description: 'Get detailed analysis of legal precedents and their applications to your specific situation.',
      gradient: 'from-[#7D4545] to-[#9E5C5C]',
    },
    {
      title: 'Document Drafting',
      description: 'Generate customized legal documents and contracts based on your specific requirements.',
      gradient: 'from-[#5C2E2E] to-[#7D4545]',
    },
    {
      title: 'Compliance Checking',
      description: 'Ensure your documents and practices comply with current laws and regulations.',
      gradient: 'from-[#7D4545] to-[#9E5C5C]',
    },
    {
      title: 'Legal Advice',
      description: 'Receive preliminary legal guidance and understand your options before consulting an attorney.',
      gradient: 'from-[#5C2E2E] to-[#7D4545]',
    },
    {
      title: 'Knowledge Base',
      description: 'Access our comprehensive library of legal guides, templates, and educational resources.',
      gradient: 'from-[#7D4545] to-[#9E5C5C]',
    },
  ];

  return (
    <section id="help" className="py-10 bg-gradient-to-b from-[#F5F3F0] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#5C2E2E] mb-6 tracking-tight">
            How We Help You
          </h2>
          <p className="text-lg text-[#5C2E2E]/70 leading-relaxed">
            LegAI provides comprehensive legal support across multiple dimensions. 
            From research to drafting, we're your AI-powered legal partner.
          </p>
        </div>

        {/* Help Items Grid - Modern Bento Box Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-[#5C2E2E]/5 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">

                {/* Title */}
                <h3 className="text-xl font-bold text-[#5C2E2E] group-hover:text-white mb-3 transition-colors duration-500">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#5C2E2E]/70 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-500">
                  {item.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#5C2E2E]/5 group-hover:bg-white/10 rounded-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
