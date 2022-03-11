import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import '../css/RecordAidDisbursement.css'
import { getOrgAppealByDocID } from '../firebase';

function RecordAidDisbursement() {

    const location = useLocation();
    const appealDocIDState = location.state;
    const appealDocID = appealDocIDState.appealDocID;
    const [ orgAppeal, setOrgAppeal ] = useState({});

    const convertTimestampToDateString = (timestamp) => {
        console.log(orgAppeal)
        return timestamp.toDate().toLocaleDateString();
    }

    useEffect(() => {
        getOrgAppealByDocID(appealDocID)
            .then((res) => setOrgAppeal(res))
    }, [])

  return (
    <div className='record-aidDisbursementWrapper'>
        <Navbar/>
        <div className='record-aidDisHeadBodyWrapper'>
            <div className='record-aidDisbursementHeader'>
                <h3>{orgAppeal.appealID}</h3>
                <Container className='record-aidDisbursementGrid'>
                    <Row className='record-aidDisbursementDateWrapper'>
                        <Col className='record-aidDisbursementDate'>From Date : {orgAppeal.fromDate && convertTimestampToDateString(orgAppeal.fromDate)}</Col>
                        <Col className='record-aidDisbursementDate'>To Date : {orgAppeal.toDate && convertTimestampToDateString(orgAppeal.toDate)}</Col>
                    </Row>
                    <Row className='record-aidDisbursementValueWrapper'>
                        <Col className='record-aidDisbursementValue'>Total Cash : ${orgAppeal.totalCash}</Col>
                        <Col className='record-aidDisbursementValue'>Total Estimated : ${orgAppeal.totalEstimatedValue}</Col>
                    </Row>
                </Container>
            </div>
        </div>
    </div>
  )
}

export default RecordAidDisbursement