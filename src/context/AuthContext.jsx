import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch additional user data from Firestore
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        // Merge auth user with firestore user data explicitly
                        setCurrentUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            ...userDoc.data()
                        });
                    } else {
                        // User Document does not exist (might happen on new signup before profile creation)
                        setCurrentUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    });
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Check if current user is an admin
    const isAdmin = currentUser?.email === 'mariana.otondo@outlook.com';

    const value = {
        currentUser,
        isAdmin,
        login,
        signup,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
