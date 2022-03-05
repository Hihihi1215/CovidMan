import React, {useState} from 'react'
import { Card } from 'react-bootstrap'
import blue from '../img/blue.jpg'
import '../css/OrganisationCard2.css'
import RegisterOrganizationRep from './RegisterOrganizationRepForm';

function OrganisationCard2(props) {


  return (
    <div className='organisation-card' onClick={props.onClick}>
        <Card>
            <Card.Img variant="top" src={blue} />
            <Card.Body>
                <Card.Title>ID: {props.organization.orgID}</Card.Title>
                <Card.Text>{props.organization.orgName} Organisation</Card.Text>
                <Card.Text className='organization-address'>{props.organization.orgAddress}</Card.Text>
            </Card.Body>
        </Card>
        
    </div>
  )
}

export default OrganisationCard2