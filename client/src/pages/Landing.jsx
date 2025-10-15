import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import HowWeHelp from '../components/HowWeHelp';
import Reviews from '../components/Reviews';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <HowWeHelp />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Landing;
