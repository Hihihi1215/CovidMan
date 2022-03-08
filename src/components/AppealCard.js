import React from 'react'
import { Card } from 'react-bootstrap'
import silver from '../img/silver.png'
import '../css/AppealCard.css'
import { Timestamp } from 'firebase/firestore'

function AppealCard(props) {

    const fromDate = props.from.toDate().toLocaleDateString();
    const toDate = props.to.toDate().toLocaleDateString();

  return (
    <div className='appeal-cardWrapper'>
        <Card className='appeal-card'>
            <Card.Img variant="top" src={silver} className='appeal-cardImg'/>
            <Card.Body>
                <Card.Title>ID : {props.appealID}</Card.Title>
                <Card.Text>From : {fromDate}</Card.Text>
                <Card.Text>To : {toDate}</Card.Text>
                <Card.Text className='appeal-cardOnHover'>{props.orgName} Organisation</Card.Text>
                <Card.Text className='appeal-cardOnHover'>{props.orgAddress}</Card.Text>
                <Card.Text className='appeal-cardOnHover'>Outcome : {props.outcome}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default AppealCard