import React from 'react';
import Hero from '../components/Hero';
import WhatIs from '../components/WhatIs';
import Why from '../components/Why';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import BlogPreview from '../components/BlogPreview';
import Download from '../components/Download';

const Home = () => {
    return (
        <main>
            <Hero />
            <WhatIs />
            <Why />
            <HowItWorks />
            <Testimonials />
            <BlogPreview />
            <Download />
        </main>
    );
};

export default Home;
