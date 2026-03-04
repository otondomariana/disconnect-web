import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import ArticleEditor from '../components/ArticleEditor';
import { FaTrash, FaPlus, FaTimes, FaEdit } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const articlesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setArticles(articlesData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching articles:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este artículo? Esta acción no se puede deshacer.')) {
            try {
                await deleteDoc(doc(db, 'articles', id));
                // Note: In a full app, you might also want to delete all comments associated with this articleID via a Cloud Function or batch delete.
            } catch (error) {
                console.error("Error deleting document: ", error);
                alert("Hubo un error al eliminar el artículo.");
            }
        }
    };

    const handleNewArticle = () => {
        setArticleToEdit(null);
        setIsEditing(true);
    };

    const handleEditArticle = (article) => {
        setArticleToEdit(article);
        setIsEditing(true);
    };

    const handleCloseEditor = () => {
        setIsEditing(false);
        setArticleToEdit(null);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('es-AR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="admin-container section-padding">
            <div className="container">
                <div className="admin-header">
                    <h2>Panel de Administrador</h2>
                    {!isEditing && (
                        <button className="btn-primary" onClick={handleNewArticle}>
                            <FaPlus /> Nuevo Artículo
                        </button>
                    )}
                    {isEditing && (
                        <button className="btn-outline" onClick={handleCloseEditor}>
                            <FaTimes /> Cancelar
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <div className="admin-editor-section">
                        <ArticleEditor
                            articleToEdit={articleToEdit}
                            onComplete={handleCloseEditor}
                        />
                    </div>
                ) : (
                    <div className="admin-articles-section">
                        <h3>Artículos Publicados ({articles.length})</h3>

                        {loading ? (
                            <p>Cargando artículos...</p>
                        ) : articles.length > 0 ? (
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Título</th>
                                            <th>Fecha</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {articles.map(article => (
                                            <tr key={article.id}>
                                                <td>
                                                    <img src={article.image} alt={article.title} className="admin-thumb" />
                                                </td>
                                                <td>
                                                    <strong>{article.title}</strong>
                                                    <div className="admin-subtitle">{article.excerpt}</div>
                                                </td>
                                                <td>{formatDate(article.createdAt)}</td>
                                                <td style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        className="btn-icon"
                                                        style={{ color: 'var(--primary-color)' }}
                                                        onClick={() => handleEditArticle(article)}
                                                        title="Editar Artículo"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn-icon btn-danger"
                                                        onClick={() => handleDelete(article.id)}
                                                        title="Eliminar Artículo"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="no-data">No hay artículos publicados todavía. Haz clic en "Nuevo Artículo" para comenzar.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
