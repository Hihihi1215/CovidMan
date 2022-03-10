import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { firebaseSignOut } from '../firebase';
import { useOrganisation } from '../OrganisationContext'

function OrgRepHome() {

    const { orgName, orgDocID } = useOrganisation();

    const signOut = () => {
        firebaseSignOut();
    }

  return (
    <div className='org-repHomeWrapper'>
        <Link to="/ViewAppeals">
          <Button variant="outline-primary">To View Appeals</Button>
        </Link>
        <Link to='/OrgRepHome/RegisterApp'>
            <Button variant="outline-primary">To Regiser Aid Applicant</Button>
        </Link>
        <Button onClick={signOut}>Sign Out</Button>
        {orgName}
    </div>
  )
}

export default OrgRepHome