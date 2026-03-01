import React, { useEffect } from 'react';
import BlogPreview from '../components/BlogPreview';

const Blog = () => {
    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="blog-page section-padding">
            <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="blog-title" style={{ marginTop: '60px' }}>Nuestro Blog</h1>
                <p className="subtitle">Espacio dedicado a reflexionar sobre nuestro consumo digital y bienestar.</p>
            </div>
            <BlogPreview hideTitle={true} />
        </main>
    );
};

export default Blog;
