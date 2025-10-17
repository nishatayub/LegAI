import React, { useState } from 'react';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      name: 'Sarah Mitchell',
      role: 'Corporate Attorney',
      company: 'Mitchell & Associates',
      avatar: 'https://i.pravatar.cc/150?img=47',
      rating: 5,
      text: "LegAI has transformed how I conduct legal research. What used to take hours now takes minutes. The AI's understanding of complex legal concepts is impressive, and the accuracy is outstanding.",
    },
    {
      name: 'David Chen',
      role: 'Law Student',
      company: 'Stanford Law School',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'As a law student, LegAI has been invaluable for my studies. It helps me understand complex cases and legal principles quickly. The explanations are clear and the research capabilities are top-notch.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Legal Consultant',
      company: 'Rodriguez Legal Solutions',
      avatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'The document drafting feature is a game-changer. I can generate customized contracts in minutes, and the compliance checking ensures everything meets current regulations. Highly recommended!',
    },
    {
      name: 'Michael Thompson',
      role: 'General Counsel',
      company: 'Tech Innovations Inc.',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: "Our legal team's productivity has increased significantly since implementing LegAI. The AI provides quick, accurate insights that help us make informed decisions faster.",
    },
    {
      name: 'Jessica Park',
      role: 'Criminal Defense Attorney',
      company: 'Park & Associates',
      avatar: 'https://i.pravatar.cc/150?img=25',
      rating: 5,
      text: 'LegAI has become an essential tool in my practice. The case analysis feature helps me find relevant precedents quickly, giving me more time to focus on strategy and client communication.',
    },
    {
      name: 'Robert Anderson',
      role: 'Solo Practitioner',
      company: 'Anderson Law Office',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      text: 'As a solo practitioner, LegAI feels like having a team of researchers at my fingertips. The cost savings and efficiency gains have been tremendous for my practice.',
    },
  ];

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#5C2E2E] mb-4">
            What Our Users Say
          </h2>
          <p className="text-base text-[#5C2E2E]/80 leading-relaxed">
            Trusted by legal professionals worldwide. Here's what they have to say about LegAI.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-[#F5F3F0] rounded-3xl p-8 border border-[#5C2E2E]/10">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4 justify-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#5C2E2E" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-base text-[#5C2E2E] leading-relaxed text-center mb-6 italic">
                        "{review.text}"
                      </p>

                      {/* Reviewer Info */}
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full border-2 border-[#5C2E2E]"
                        />
                        <div className="text-left">
                          <p className="font-bold text-[#5C2E2E] text-sm">{review.name}</p>
                          <p className="text-[#5C2E2E]/70 text-xs">{review.role}</p>
                          <p className="text-[#5C2E2E]/70 text-xs">{review.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#5C2E2E] border border-[#5C2E2E] rounded-full flex items-center justify-center hover:bg-[#7A4444] text-white transition-all duration-200 shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#5C2E2E] border border-[#5C2E2E] rounded-full flex items-center justify-center hover:bg-[#7A4444] text-white transition-all duration-200 shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === activeReview ? 'bg-[#5C2E2E] w-8' : 'bg-[#5C2E2E]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#5C2E2E] mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#5C2E2E" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-[#5C2E2E]/70 text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#5C2E2E] mb-2">10K+</div>
            <p className="text-[#5C2E2E]/70 text-sm">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#5C2E2E] mb-2">98%</div>
            <p className="text-[#5C2E2E]/70 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
