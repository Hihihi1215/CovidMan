import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Toast } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import RecordAidDisAppCard from '../components/RecordAidDisAppCard';
import RecordAidDisbursementModal from '../components/RecordAidDisbursementModal';
import RecordOutcomeModal from '../components/RecordOutcomeModal';
import '../css/RecordAidDisbursement.css'
import { db, getOrgAppealByDocID } from '../firebase';
import { useOrganisation } from '../OrganisationContext';

function RecordAidDisbursement(props) {

    const [showToast, setShowToast ] = useState(false);
    const handleShowToast = () => setShowToast(true);
    const location = useLocation();
    const appealDocIDState = location.state;
    const appealDocID = appealDocIDState.appealDocID;
    const { orgDocID } = useOrganisation();
    const [ orgAidApplicants, setOrgAidApplicants ] = useState([]);
    const [ orgAppeal, setOrgAppeal ] = useState({});
    const [ totalOrgAppealCash, setTotalOrgAppealCash ] = useState('');
    const [ totalOrgAppealValue, setTotalOrgAppealValue ] = useState('');
    const [ orgAidAppDocID, setOrgAidAppDocID ] = useState('');
    const [ recAidDisModalShow, setRecAidDisModalShow ] = useState(false);
    const handleRecAidDisModalShow = () => setRecAidDisModalShow(true);
    const handleRecAidDisModalHide = () => setRecAidDisModalShow(false);
    const [ recOutcomeShow, setRecOutcomeShow ] = useState(false);
    const handleRecOutcomeModalShow = () => setRecOutcomeShow(true);
    const handleRecOutcomeModalHide = () => setRecOutcomeShow(false);
    const usersRef = collection(db, "users");
    const orgAidAppsQ = query(usersRef, where("orgDocID", "==", orgDocID), where("userType", "==", "aidApplicant"));

    const showCheckMarkAnimation = () => {
        const checkIcon = document.querySelector('.check-icon');
        const checkIconLabel = document.querySelector('.check-iconLabel');
        setTimeout(() => {
          checkIcon.style.display = 'block';
          checkIconLabel.style = `
            animation : none;
            border-color : #43c9ff;
            transition : border 1s ease-out
          `
        }, 1000);
    }

    const getOrgAidAppsByDocID = async () => {
        const querySnapshot = await getDocs(orgAidAppsQ);
        setOrgAidApplicants(querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            uid : doc.id
        })))
    }

    const convertTimestampToDateString = (timestamp) => {
        return timestamp.toDate().toLocaleDateString();
    }

    const setupOrgAppeal = (res) => {
        setOrgAppeal(res);
        setTotalOrgAppealCash(res.totalCash);
        setTotalOrgAppealValue(res.totalEstimatedValue);
    }

    useEffect(() => {
        getOrgAppealByDocID(appealDocID)
            .then((res) => setupOrgAppeal(res))
        getOrgAidAppsByDocID()
    }, [])

  return (
    <div className='record-aidDisbursementWrapper'>
        <div className='record-aidDisHeadBodyWrapper'>
            <div className='record-aidDisbursementHeader'>
                <h4>Record Aid Disbursement</h4>
                <h5>Appeal ID : {orgAppeal.appealID}</h5>
                <Container className='record-aidDisbursementGrid'>
                    <Row className='record-aidDisbursementDateWrapper'>
                        <Col className='record-aidDisbursementDate'>From Date : {orgAppeal.fromDate && convertTimestampToDateString(orgAppeal.fromDate)}</Col>
                        <Col className='record-aidDisbursementDate'>To Date : {orgAppeal.toDate && convertTimestampToDateString(orgAppeal.toDate)}</Col>
                    </Row>
                    <Row className='record-aidDisbursementValueWrapper'>
                        <Col className='record-aidDisbursementValue'>Total Cash : ${totalOrgAppealCash}</Col>
                        <Col className='record-aidDisbursementValue'>Total Estimated : ${totalOrgAppealValue}</Col>
                    </Row>
                </Container>
                <Button onClick={handleRecOutcomeModalShow} className='record-outcome-btn'>Record Outcome</Button>
            </div>
            <div className='record-aidDisbursementBody'>
                {
                    orgAidApplicants.map((orgAidApp, i) => (
                        <RecordAidDisAppCard
                            idno={orgAidApp.IDno}
                            name={orgAidApp.fullname}
                            income={orgAidApp.householdIncome}
                            address={orgAidApp.residentialAddress}
                            uid={orgAidApp.uid}
                            setOrgAidAppDocID={setOrgAidAppDocID}
                            handleRecAidDisModalShow={handleRecAidDisModalShow}/>
                    ))
                }
            </div>
        </div>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className='aid-disbursed-toast'>
          <Toast.Body className='aid-disbursed-toast__body'>
              Aid Disbursed!
            <button type="button" class="btn-close aid-disbursed-toast__close-btn" aria-label="Close" onClick={() => setShowToast(false)}></button>
          </Toast.Body>
        </Toast>
        <RecordAidDisbursementModal
            totalCash={totalOrgAppealCash}
            totalValue={totalOrgAppealValue}
            appealDocID={appealDocID}
            recAidDisModalShow={recAidDisModalShow}
            handleRecAidDisModalHide={handleRecAidDisModalHide}
            orgAidAppDocID={orgAidAppDocID}
            setTotalOrgAppealCash={setTotalOrgAppealCash}
            setTotalOrgAppealValue={setTotalOrgAppealValue}
            handleShowToast={handleShowToast}/>
        <RecordOutcomeModal
            showCheckMarkAnimation={showCheckMarkAnimation}
            recOutcomeShow={recOutcomeShow}
            handleRecOutcomeModalHide={handleRecOutcomeModalHide}
            appealDocID={appealDocID}
            showRecordSuccess={props.showRecordSuccess}/>
    </div>
  )
}

export default RecordAidDisbursement