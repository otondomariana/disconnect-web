import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { FaArrowLeft } from 'react-icons/fa';

// A simple helper to parse basic markdown-like content into elements
const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
            return <h1 key={index} className="blog-title">{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
            return <h2 key={index} className="blog-subtitle">{line.substring(3)}</h2>;
        } else if (line.startsWith('* ')) {
            const parsedLine = line.substring(2)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            return <li key={index} dangerouslySetInnerHTML={{ __html: parsedLine }} />;
        } else if (line.trim() === '') {
            return <br key={index} />;
        } else {
            const parsedLine = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            return <p key={index} className="blog-paragraph" dangerouslySetInnerHTML={{ __html: parsedLine }} />;
        }
    });
};

const BlogArticle = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="container section-padding" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Artículo no encontrado</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>Volver al inicio</Link>
            </div>
        );
    }

    return (
        <main className="blog-article-page">
            <div className="container blog-container">
                <Link to="/#blog" className="back-link">
                    <FaArrowLeft /> Volver al Blog
                </Link>

                <div className="article-hero-img-wrapper">
                    <img src={post.image} alt={post.title} className="article-hero-img" />
                </div>

                <article className="article-content">
                    <span className="blog-date-article">{post.date}</span>
                    {renderContent(post.content)}
                </article>
            </div>
        </main>
    );
};

export default BlogArticle;
