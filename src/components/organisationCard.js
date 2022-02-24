import React from 'react'
import { Card } from 'react-bootstrap'
import blue from '../img/blue.jpg'
import '../css/OrganisationCard.css'


function OrganisationCard(props) {
  return (
    <div className='organisation-card'>
        <Card style={{ width: '17rem' }}>
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