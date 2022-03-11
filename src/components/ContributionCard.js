import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import green from '../img/green.jpg';
import yellow from '../img/yellow.jpg';
import '../css/ContributionCard.css'
import { Timestamp } from 'firebase/firestore'

function ContributionCard(props) {

    const [ contributionImg, setContributionImg ] = useState('');

    const convertTimestampToDateString = (timestamp) => {
        return timestamp.toDate().toLocaleDateString();
    }

    const yellowOrGreen = () => {
        if(props.contributionType === 'cash')
            setContributionImg(green)
        else if(props.contributionType === 'goods')
            setContributionImg(yellow)
    }

    useEffect(() => {
        yellowOrGreen();
    }, [contributionImg])

  return (
    <div className='contribution-cardWrapper'>
        <Card className='contribution-card'>
            <Card.Img variant="top" src={contributionImg} className='contribution-cardImg'/>
            <Card.Body>
                <Card.Title>{props.contributionID}</Card.Title>
                <Card.Text>{props.receivedDate && `Received Date : ${convertTimestampToDateString(props.receivedDate)}`}</Card.Text>
                <Card.Text>{props.amount && `Amount : ${props.amount}`}</Card.Text>
                <Card.Text>{props.paymentChannel && `Payment Channel : ${props.paymentChannel}`}</Card.Text>
                <Card.Text>{props.referenceNo && `Reference No : ${props.referenceNo}`}</Card.Text>
                <Card.Text>{props.estimatedValue && `Estimated Value : ${props.estimatedValue}`}</Card.Text>
                <Card.Text>{props.description}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ContributionCard