import React from 'react';

const HowWeHelp = () => {
  const helpItems = [
    {
      number: '01',
      title: 'Legal Research',
      description: 'Quickly find relevant case law, statutes, and regulations across multiple jurisdictions.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-[#4C9F70]',
    },
    {
      number: '02',
      title: 'Case Analysis',
      description: 'Get detailed analysis of legal precedents and their applications to your specific situation.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      color: 'bg-[#4C9F70]',
    },
    {
      number: '03',
      title: 'Document Drafting',
      description: 'Generate customized legal documents and contracts based on your specific requirements.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M14 2v6h6M8 13h8M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-[#4C9F70]',
    },
    {
      number: '04',
      title: 'Compliance Checking',
      description: 'Ensure your documents and practices comply with current laws and regulations.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      color: 'bg-[#4C9F70]',
    },
    {
      number: '05',
      title: 'Legal Advice',
      description: 'Receive preliminary legal guidance and understand your options before consulting an attorney.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 10h6M9 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-[#4C9F70]',
    },
    {
      number: '06',
      title: 'Knowledge Base',
      description: 'Access our comprehensive library of legal guides, templates, and educational resources.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7h8M8 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-[#4C9F70]',
    },
  ];

  return (
    <section id="help" className="py-24 bg-[#EAE4DC]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#101820] mb-4">
            How We <span className="text-[#4C9F70]">Help You</span>
          </h2>
          <p className="text-base text-[#6E7F80] leading-relaxed">
            LegAI provides comprehensive legal support across multiple dimensions. 
            From research to drafting, we're your AI-powered legal partner.
          </p>
        </div>

        {/* Help Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl border border-[#6E7F80]/20 hover:border-transparent transition-all duration-300 hover:-translate-y-2"
            >
              {/* Number Badge */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#101820] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {item.number}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#101820] mb-3">
                {item.title}
              </h3>
              <p className="text-[#6E7F80] text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#4C9F70] font-semibold hover:gap-3 transition-all duration-200"
              >
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-[#4C9F70] rounded-3xl p-10">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready to Transform Your Legal Work?
          </h3>
          <p className="text-white/90 text-base mb-6 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust LegAI for their research needs.
          </p>
          <a
            href="/echoai"
            className="inline-block px-8 py-3 bg-white text-[#4C9F70] rounded-xl font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
          >
            Start Your Free Trial
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
