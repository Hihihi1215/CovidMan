import React from 'react'
import { Card } from 'react-bootstrap'
import blue from '../img/blue.jpg'
import '../css/OrganisationCard.css'
import { useNavigate } from 'react-router-dom'

function OrganisationCard(props) {

  const navigate = useNavigate();

  const fromSelectOrgToRegApp = () => {
    navigate(
      '/OrgRepHome/RegisterApp',
      { state : { orgName : props.orgName, orgDocID : props.orgDocID, fromSelectOrg : true } }
    );
  }

  return (
    <div className='organisation-card' onClick={fromSelectOrgToRegApp}>
        <Card>
            <Card.Img variant="top" src={blue} />
            <Card.Body>
                <Card.Title>ID: {props.orgID}</Card.Title>
                <Card.Text>{props.orgName} Organisation</Card.Text>
                <Card.Text className='organization-address'>{props.orgAddress}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default OrganisationCard