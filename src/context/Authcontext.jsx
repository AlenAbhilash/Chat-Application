import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const userDetails = {
                            email: user.email,
                            uid: user.uid,
                            username: userData.username,
                            profilePic: userData.profilePic,
                        };

                        console.log("User Details:", userDetails);
                        setCurrentUser(userDetails);
                    } else {
                        console.log("User data not found in Firestore");
                        setCurrentUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setCurrentUser(null);
                }
            } else {
                console.log("No user is signed in");
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
