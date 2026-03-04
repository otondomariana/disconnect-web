import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    // Helper to create or verify user profile in Firestore
    const checkAndCreateUserProfile = async (user, nameParam = null) => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // Create new profile
            await setDoc(userRef, {
                email: user.email,
                displayName: nameParam || user.displayName || user.email.split('@')[0],
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp()
            });
        } else {
            // Update last login
            await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const userCredential = await login(email, password);
                await checkAndCreateUserProfile(userCredential.user);
            } else {
                if (!displayName.trim()) {
                    setError('El alias (displayName) es obligatorio para registrarse.');
                    setLoading(false);
                    return;
                }
                const userCredential = await signup(email, password);
                await checkAndCreateUserProfile(userCredential.user, displayName);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Este correo ya está registrado. Intenta iniciar sesión.');
            } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                setError('Correo o contraseña incorrectos.');
            } else if (err.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else {
                setError('Ocurrió un error. Por favor, intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setError('');
        setLoading(true);
        try {
            const userCredential = await loginWithGoogle();
            await checkAndCreateUserProfile(userCredential.user);
            navigate('/');
        } catch (err) {
            console.error(err);
            if (err.code !== 'auth/popup-closed-by-user') {
                setError('Ocurrió un error al conectar con Google.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
                <p className="auth-subtitle">
                    {isLogin
                        ? 'Ingresa para interactuar con la comunidad Disconnect'
                        : 'Únete para dejar comentarios y guardar tu progreso'}
                </p>

                {error && <div className="auth-alert error">{error}</div>}

                <button
                    type="button"
                    className="btn-google"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                >
                    <FcGoogle className="google-icon" />
                    Continuar con Google
                </button>

                <div className="auth-divider">
                    <span>O usa tu correo electrónico</span>
                </div>

                <form onSubmit={handleEmailAuth} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="displayName">Alias (Se mostrará en tus comentarios)</label>
                            <input
                                type="text"
                                id="displayName"
                                placeholder="Ej: CodeNinja99"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>

                    <button disabled={loading} type="submit" className="auth-submit-btn">
                        {loading ? 'Cargando...' : (isLogin ? 'Ingresar' : 'Registrarse')}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLogin ? (
                        <p>
                            ¿No tienes cuenta?{' '}
                            <button type="button" className="auth-link-btn" onClick={() => { setIsLogin(false); setError(''); }}>
                                Regístrate aquí
                            </button>
                        </p>
                    ) : (
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <button type="button" className="auth-link-btn" onClick={() => { setIsLogin(true); setError(''); }}>
                                Inicia Sesión
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
