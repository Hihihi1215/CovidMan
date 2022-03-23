import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { firebaseSignOut } from '../firebase';

function OrgRepHome() {

  const navigate = useNavigate();

  const signOut = () => {
      firebaseSignOut();
      navigate('/', { replace : true});
  }

  return (
    <div className='org-repHomeWrapper'>
        
    </div>
  )
}

export default OrgRepHome