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
        <Link to="/ViewAppeals">
          <Button variant="outline-primary">To View Appeals</Button>
        </Link>
        <Link to='/OrgRepHome/RegisterApp'>
            <Button variant="outline-primary">To Regiser Aid Applicant</Button>
        </Link>
        <Link to='/OrgRepHome/ViewOrgAppeals'>
          To View Org Appeals
        </Link>
        <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default OrgRepHome