import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './ArticleEditor.css';

const ArticleEditor = ({ articleToEdit, onComplete }) => {
    const { currentUser } = useAuth();

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (articleToEdit) {
            setTitle(articleToEdit.title || '');
            setExcerpt(articleToEdit.excerpt || '');
            setImageUrl(articleToEdit.image || '');
            setContent(articleToEdit.content || '');
            setPreviewImgError(false);
        }
    }, [articleToEdit]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImgError, setPreviewImgError] = useState(false);

    const modules = {
        toolbar: [
            [{ 'header': [2, 3, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    };

    const formats = [
        'header', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'color', 'background'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !excerpt.trim() || !imageUrl.trim() || !content.trim()) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (previewImgError) {
            setError('La URL de la imagen no parece ser un archivo válido. Verifica que el link termine en .jpg, .png o similar.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (articleToEdit) {
                const articleRef = doc(db, 'articles', articleToEdit.id);
                await updateDoc(articleRef, {
                    title: title.trim(),
                    excerpt: excerpt.trim(),
                    image: imageUrl.trim(),
                    content: content,
                    editedAt: serverTimestamp()
                });
            } else {
                await addDoc(collection(db, 'articles'), {
                    title: title.trim(),
                    excerpt: excerpt.trim(),
                    image: imageUrl.trim(),
                    content: content,
                    authorUid: currentUser.uid,
                    authorName: currentUser.displayName || currentUser.email.split('@')[0],
                    createdAt: serverTimestamp()
                });
            }

            // Return to Admin list
            onComplete();
        } catch (err) {
            console.error('Error al guardar artículo: ', err);
            setError('Hubo un error al publicar el artículo.');
            setLoading(false);
        }
    };

    return (
        <div className="article-editor">
            <h3>{articleToEdit ? 'Editar Artículo' : 'Publicar Nuevo Artículo'}</h3>
            <p className="editor-subtitle">
                {articleToEdit
                    ? 'Modifica los datos del artículo y guárdalos.'
                    : 'Completa los datos para publicarlo directamente en el blog.'}
            </p>

            {error && <div className="editor-alert error">{error}</div>}

            <form onSubmit={handleSubmit} className="editor-form">
                <div className="editor-grid">
                    <div className="form-group">
                        <label htmlFor="title">Título del Artículo</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej. El impacto de la tecnología"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="excerpt">Breve Resumen (Aparecerá en la tarjeta del blog)</label>
                    <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Escribe de qué trata el artículo en un par de líneas..."
                        rows="2"
                        required
                    />
                </div>

                <div className="form-group image-url-group">
                    <label htmlFor="imageUrl">URL de la Imagen (Banner)</label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => {
                            setImageUrl(e.target.value);
                            setPreviewImgError(false);
                        }}
                        placeholder="https://pagina.com/foto.jpg"
                        required
                    />
                    <small className="form-help">Pega el link directo a una imagen de internet (preferiblemente horizontal).</small>

                    {imageUrl && (
                        <div className="image-preview">
                            <p className="preview-label">Vista Previa:</p>
                            <img
                                src={imageUrl}
                                alt="Vista previa del banner"
                                onError={() => setPreviewImgError(true)}
                                style={{ display: previewImgError ? 'none' : 'block' }}
                            />
                            {previewImgError && (
                                <p className="preview-error">No se pudo cargar la imagen desde este enlace.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="form-group content-group">
                    <label htmlFor="content">Contenido del Artículo</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        placeholder="Empieza a escribir tu increíble artículo aquí..."
                    />
                </div>

                <div className="editor-actions">
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Guardando...' : (articleToEdit ? 'Guardar Cambios' : 'Publicar Artículo')}
                    </button>
                    <button type="button" className="btn-outline" onClick={onComplete} disabled={loading}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleEditor;
