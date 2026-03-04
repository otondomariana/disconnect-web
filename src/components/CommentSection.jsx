import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './CommentSection.css';

const CommentSection = ({ articleId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const { currentUser, isAdmin } = useAuth();

    useEffect(() => {
        if (!articleId) return;

        const q = query(
            collection(db, 'comments'),
            where('articleId', '==', articleId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Ordenamos localmente para evitar error de índice en Firestore
            commentsData.sort((a, b) => {
                const dateA = a.createdAt ? a.createdAt.toDate() : new Date();
                const dateB = b.createdAt ? b.createdAt.toDate() : new Date();
                return dateB - dateA;
            });

            setComments(commentsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching comments:", error);
            // In a real app, you'd show an error message
            setLoading(false);
        });

        return () => unsubscribe();
    }, [articleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !currentUser) return;

        setSubmitting(true);
        setErrorMsg('');
        try {
            await addDoc(collection(db, 'comments'), {
                articleId,
                userId: currentUser.uid,
                userEmail: isAnonymous ? null : currentUser.email,
                userDisplayName: isAnonymous ? 'Usuario Anónimo' : (currentUser.displayName || currentUser.email.split('@')[0]),
                isAnonymous: isAnonymous,
                text: newComment.trim(),
                createdAt: serverTimestamp()
            });
            setNewComment('');
            setIsAnonymous(false);
        } catch (error) {
            console.error("Error adding comment: ", error);
            if (error.code === 'permission-denied') {
                setErrorMsg("No tienes permisos para comentar. Verifica las reglas de Firestore.");
            } else {
                setErrorMsg("Hubo un error al publicar tu comentario: " + error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (commentId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario de forma permanente? Esta acción no se puede deshacer.')) {
            try {
                await deleteDoc(doc(db, 'comments', commentId));
            } catch (error) {
                console.error("Error al eliminar comentario: ", error);
                alert("Hubo un error al eliminar el comentario. Revisa los permisos.");
            }
        }
    };

    const handleEditStart = (comment) => {
        setEditingId(comment.id);
        setEditContent(comment.text);
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditContent('');
    };

    const handleEditSave = async (commentId) => {
        if (!editContent.trim()) return;

        try {
            const commentRef = doc(db, 'comments', commentId);
            await updateDoc(commentRef, {
                text: editContent.trim(),
                editedAt: serverTimestamp()
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating comment: ", error);
            alert("No se pudo editar el comentario.");
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Publicando...';
        // Firestore timestamp to JS Date
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('es-AR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="comments-section">
            <h3 className="comments-title">Comentarios ({comments.length})</h3>

            <div className="comment-form-container">
                {currentUser ? (
                    <form onSubmit={handleSubmit} className="comment-form">
                        <div className="user-indicator" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span>Comentando como <strong>{isAnonymous ? 'Usuario Anónimo' : (currentUser.displayName || currentUser.email?.split('@')[0] || 'Anónimo')}</strong></span>
                            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                />
                                Publicar como anónimo
                            </label>
                        </div>
                        {errorMsg && <div className="editor-alert error" style={{ marginBottom: '10px' }}>{errorMsg}</div>}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="¿Qué te pareció este artículo?"
                            className="comment-input"
                            rows="3"
                            required
                        />
                        <button
                            type="submit"
                            className="btn-primary comment-submit"
                            disabled={submitting || !newComment.trim()}
                        >
                            {submitting ? 'Publicando...' : 'Publicar comentario'}
                        </button>
                    </form>
                ) : (
                    <div className="login-prompt">
                        <p>Para dejar un comentario, necesitas iniciar sesión con tu cuenta de la app móvil Disconnect.</p>
                        <Link to="/auth" className="btn-primary">Identificarse</Link>
                    </div>
                )}
            </div>

            <div className="comments-list">
                {loading ? (
                    <p className="comments-loading">Cargando comentarios...</p>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-avatar">
                                {comment.userDisplayName ? comment.userDisplayName.charAt(0).toUpperCase() : (comment.userEmail ? comment.userEmail.charAt(0).toUpperCase() : 'U')}
                            </div>
                            <div className="comment-content" style={{ width: '100%' }}>
                                <div className="comment-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                    <div>
                                        <span className="comment-author">
                                            {comment.userDisplayName || (comment.userEmail ? comment.userEmail.split('@')[0] : 'Usuario Anónimo')}
                                        </span>
                                        <span className="comment-date" style={{ marginLeft: '10px' }}>
                                            {formatDate(comment.createdAt)}
                                            {comment.editedAt &&
                                                <span style={{ fontStyle: 'italic', fontSize: '0.8em', marginLeft: '5px', color: 'var(--text-muted)' }}>
                                                    (Editado {formatDate(comment.editedAt)})
                                                </span>
                                            }
                                        </span>
                                    </div>

                                    {currentUser && (isAdmin || currentUser.uid === comment.userId) && (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {currentUser.uid === comment.userId && editingId !== comment.id && (
                                                <button
                                                    onClick={() => handleEditStart(comment)}
                                                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                    title="Editar comentario"
                                                >
                                                    <FiEdit2 size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                title="Eliminar comentario"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {editingId === comment.id ? (
                                    <div style={{ marginTop: '10px' }}>
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="comment-input"
                                            rows="2"
                                            style={{ marginBottom: '10px', fontSize: '0.95rem' }}
                                        />
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => handleEditSave(comment.id)}
                                                className="btn-primary"
                                                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={handleEditCancel}
                                                className="btn-outline"
                                                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="comment-text">{comment.text}</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">Aún no hay comentarios. {currentUser && '¡Sé el primero en comentar!'}</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
