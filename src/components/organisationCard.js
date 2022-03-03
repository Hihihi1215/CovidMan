import React from 'react'
import { Card } from 'react-bootstrap'
import blue from '../img/blue.jpg'
import '../css/OrganisationCard.css'
import { useNavigate } from 'react-router-dom'


function OrganisationCard(props) {

  const navigate = useNavigate();

  const fromSelectOrgToRegApp = () => {
    navigate(
      '/RegisterApp',
      { state : { orgName : props.orgName, orgDocID : props.orgDocID } }
    );
  }

  return (
    <div className='organisation-card' onClick={fromSelectOrgToRegApp}>
        <Card>
            <Card.Img variant="top" src={blue} />
            <Card.Body>
                <Card.Title>{props.orgName} Organisation</Card.Title>
                <Card.Text>{props.orgAddress}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default OrganisationCard