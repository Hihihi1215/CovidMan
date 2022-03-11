import React from 'react'
import { Card } from 'react-bootstrap'
import lightblue from '../img/lightBlue.jpg'
import '../css/RecordAidDisAppCard.css'

function RecordAidDisAppCard(props) {
  return (
    <div className='record-aidDisAppCardWrapper'>
        <Card className='record-aidDisAppCard'>
            <Card.Img variant="top" src={lightblue} className='record-aidDisAppCardImg'/>
            <Card.Body>
                <Card.Title>IDno : {props.idno}</Card.Title>
                <Card.Text>Name : {props.name}</Card.Text>
                <Card.Text>Household Income : ${props.income}</Card.Text>
                <Card.Text>{props.address}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default RecordAidDisAppCard