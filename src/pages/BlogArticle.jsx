import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// A simple helper to parse legacy markdown-like content OR render rich HTML content
const renderContent = (content) => {
    // Sanitizar non-breaking spaces que evitan el salto de línea normal
    const cleanContent = content.replace(/&nbsp;/g, ' ');

    // Determine if the content is HTML (from React Quill)
    if (cleanContent.includes('<p>') || cleanContent.includes('<h1>') || cleanContent.includes('<h2>') || cleanContent.includes('<strong>')) {
        return <div className="article-html-content" dangerouslySetInnerHTML={{ __html: cleanContent }} />;
    }

    // Legacy parser for old articles
    return cleanContent.split('\n').map((line, index) => {
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
    const [post, setPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'articles', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setPost(null);
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="container section-padding" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Cargando artículo...</h2>
            </div>
        );
    }

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

                <h1 className="blog-title">{post.title}</h1>
                {post.subtitle && <h2 className="blog-subtitle" style={{ marginTop: '0' }}>{post.subtitle}</h2>}

                <div className="article-hero-img-wrapper">
                    <img src={post.image} alt={post.title} className="article-hero-img" />
                </div>

                <article className="article-content">
                    <span className="blog-date-article">{formatDate(post.createdAt)}</span>
                    {renderContent(post.content)}
                </article>

                <CommentSection articleId={id} />
            </div>
        </main>
    );
};

export default BlogArticle;
