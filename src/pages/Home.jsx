import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Benefits from '../components/Benefits';
import Join from '../components/Join';
import Pricing from '../components/pricing';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <About />
      <Benefits />
      <Join />
      <Pricing />
      <Testimonials />
      <Footer />
    </>
  )
}

export default Home