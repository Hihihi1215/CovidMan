import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import RecordAidDisAppCard from '../components/RecordAidDisAppCard';
import '../css/RecordAidDisbursement.css'
import { db, getOrgAppealByDocID } from '../firebase';
import { useOrganisation } from '../OrganisationContext';

function RecordAidDisbursement() {

    const location = useLocation();
    const appealDocIDState = location.state;
    const appealDocID = appealDocIDState.appealDocID;
    const { orgDocID } = useOrganisation();
    const [ orgAidApplicants, setOrgAidApplicants ] = useState([]);
    const [ orgAppeal, setOrgAppeal ] = useState({});
    const usersRef = collection(db, "users");
    const orgAidAppsQ = query(usersRef, where("orgDocID", "==", orgDocID), where("userType", "==", "aidApplicant"));

    const getOrgAidAppsByDocID = async () => {
        const querySnapshot = await getDocs(orgAidAppsQ);
        setOrgAidApplicants(querySnapshot.docs.map((doc) => ({
            ...doc.data()
        })))
    }

    const convertTimestampToDateString = (timestamp) => {
        return timestamp.toDate().toLocaleDateString();
    }

    useEffect(() => {
        getOrgAppealByDocID(appealDocID)
            .then((res) => setOrgAppeal(res))
        getOrgAidAppsByDocID()
    }, [])

  return (
    <div className='record-aidDisbursementWrapper'>
        <Navbar/>
        <div className='record-aidDisHeadBodyWrapper'>
            <div className='record-aidDisbursementHeader'>
                <h5>Record Aid Disbursement</h5>
                <h5>{orgAppeal.appealID}</h5>
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
            <div className='record-aidDisbursementBody'>
                {
                    orgAidApplicants.map((orgAidApp, i) => (
                        <RecordAidDisAppCard
                            idno={orgAidApp.IDno}
                            name={orgAidApp.fullname}
                            income={orgAidApp.householdIncome}
                            address={orgAidApp.residentialAddress}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default RecordAidDisbursement