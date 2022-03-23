import React, { useContext, useEffect, useState } from 'react';
import { auth, authStateChanged, getUserByUID } from './firebase';

const UserAuthContext = React.createContext();
const UserTypeContext = React.createContext();

export const useUserType = () => {
    return useContext(UserTypeContext);
}

export const useUserAuth = () => {
    return useContext(UserAuthContext);
}

function UserAuthProvider({children}) {
    const [ user, setUser ] = useState("");
    const [ userType, setUserType ] = useState("");

    useEffect(() => {
        const unsubscribe = authStateChanged(auth, (currentUser) => {
            setUser(currentUser);     
            getUserByUID(currentUser.uid)
                .then((res) => {
                    setUserType(res.userType)
                });
        })
        return () => {
            unsubscribe();
        }
    }, [user]);

    return (
        <UserAuthContext.Provider value={user}>
            <UserTypeContext.Provider value={userType}>
                {children}
            </UserTypeContext.Provider>
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider