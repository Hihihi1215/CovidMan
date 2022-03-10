import React, { useContext, useEffect, useState } from 'react';
import { auth, authStateChanged } from './firebase';

const UserAuthContext = React.createContext();

export const useUserAuth = () => {
    return useContext(UserAuthContext);
}

function UserAuthProvider({children}) {
    const [ user, setUser ] = useState("");

    useEffect(() => {
        const unsubscribe = authStateChanged(auth, (currentUser) => {
            setUser(currentUser);     
        })
        return () => {
            unsubscribe();
        }
    }, [user]);

    return (
        <UserAuthContext.Provider value={user}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider