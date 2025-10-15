import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#101820] to-[#2d3842]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
        <p className="text-[#EAE4DC]/80 mb-6">
          Subscribe to our newsletter for legal insights and product updates.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#4C9F70] transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#4C9F70] text-white rounded-lg font-semibold hover:bg-[#3d8059] transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
