import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../UserAuthContext'

function ProtectedRoute({children}) {

    const location = useLocation();
    const state = location.state;
    const fromSelectOrgNav = state? state.fromSelectOrg : false;

    let user = useUserAuth();
    if(!user && !fromSelectOrgNav){
        return <Navigate to='/'/>
    }
    return children;
}

export default ProtectedRoute