import React from 'react'
import { Card } from 'react-bootstrap'
import blue from '../img/blue.jpg'
import '../css/OrganisationCard.css'

function OrganisationCard(props) {
  return (
    <div className='organisation-card'>
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