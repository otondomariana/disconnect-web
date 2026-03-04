import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const BlogPreview = ({ hideTitle = false }) => {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const articlesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(articlesData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <section id="blog" className="bg-soft section-padding">
            <div className="container">
                {!hideTitle && <h2>Aprendé sobre bienestar digital</h2>}
                <div className="grid-3" style={{ marginTop: hideTitle ? '0' : '40px' }}>

                    {loading ? (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Cargando artículos...</p>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
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
                                    <span className="blog-date">{formatDate(post.createdAt)}</span>
                                    <p>{post.excerpt}</p>
                                    <span className="read-more">
                                        Leer más <FaArrowRight className="arrow-icon" />
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Aún no hay artículos publicados.</p>
                    )}

                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
