import React from 'react'
import { Button, Card } from 'react-bootstrap'
import lightblue from '../img/lightBlue.jpg'
import '../css/RecordAidDisAppCard.css'
import { viewFiles } from '../firebase'

function RecordAidDisAppCard(props) {

  const recAidDisAppCardClick = () => {
    props.handleRecAidDisModalShow();
    props.setOrgAidAppDocID(props.uid);
  }

  const viewIncomeClick = () => {
    viewFiles(props.uid);
  }

  return (
    <div className='record-aidDisAppCardWrapper' onClick={recAidDisAppCardClick}>
        <Card className='record-aidDisAppCard'>
            <Card.Img variant="top" src={lightblue} className='record-aidDisAppCardImg'/>
            <Card.Body>
                <Card.Title>IDno : {props.idno}</Card.Title>
                <Card.Text>Name : {props.name}</Card.Text>
                <Card.Text>Household Income : ${props.income}</Card.Text>
                <Card.Text>{props.address}</Card.Text>
                <div className='download-IncomeFileBtnWrapper'>
                  <Button 
                    className='download-IncomeFileBtn' 
                    variant='primary'
                    onClick={viewIncomeClick}>
                      View Income File
                  </Button>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default RecordAidDisAppCard