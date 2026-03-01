import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { blogPosts } from '../data/blogData';

const BlogPreview = ({ hideTitle = false }) => {
    return (
        <section id="blog" className="bg-soft section-padding">
            <div className="container">
                {!hideTitle && <h2>Aprendé sobre bienestar digital</h2>}
                <div className="grid-3" style={{ marginTop: hideTitle ? '0' : '40px' }}>

                    {blogPosts.map((post) => (
                        <Link to={`/blog/${post.id}`} key={post.id} className="card blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="blog-img-wrapper">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="blog-img"
                                />
                            </div>
                            <div className="blog-content">
                                <h3>{post.title}</h3>
                                <span className="blog-date">{post.date}</span>
                                <p>{post.excerpt}</p>
                                <span className="read-more">
                                    Leer más <FaArrowRight className="arrow-icon" />
                                </span>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
