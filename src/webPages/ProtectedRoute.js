import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext'

function ProtectedRoute({children}) {

    let user = useUserAuth();
    console.log(user)
    if(!user){
        return <Navigate to='/'/>;
    }
    return children;
}

export default ProtectedRoute