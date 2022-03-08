import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import AppealCard from '../components/AppealCard'
import Navbar from '../components/Navbar'
import '../css/ViewAppeals.css'
import { convertDateToTimestamp, db, getOrgByDocID } from '../firebase';

function ViewAppeals() {

    const [ currentAppeals, setCurrentAppeals ] = useState([]);
    const [ pastAppeals, setPastAppeals ] = useState([]);
    const [ appeals, setAppeals ] = useState([]);
    const today = new Date();
    const appealsRef = collection(db, "appeals");

    const getAppeals = async (logicalOp) => {
        const q = query(appealsRef, where("toDate", logicalOp, convertDateToTimestamp(today)))
        const querySnapshot = await getDocs(q);
        let dummyAppeals = []; 
        querySnapshot.docs.map((doc) => {
            const docData = { ...doc.data() };
            getOrgByDocID(docData.orgDocID)
                .then((res) => {
                    const appealData = {
                        ...docData,
                        orgName : res.orgName, 
                        orgAddress : res.orgAddress
                    }
                    dummyAppeals.push(appealData)
                    setCurrentAppeals(dummyAppeals);
                })
        })
    }

    useEffect(() => {
        getAppeals(">=")
            .then((res) => setAppeals(currentAppeals.map((appeal, i) => {
                return (
                    <AppealCard
                        appealID={appeal.appealID}
                        from={appeal.fromDate}
                        to={appeal.toDate}
                        orgName={appeal.orgName}
                        orgAddress={appeal.orgAddress}
                        outcome={appeal.outcome}/>
                )
            })));
    }, []);

    const pastPresentOnClick = e => {
        const past = document.querySelector('#past');
        const present = document.querySelector('#present');
        if(e.target.id === 'past'){
            past.classList.add('past-presentActive');
            present.classList.remove('past-presentActive');
        } else if(e.target.id === 'present'){
            present.classList.add('past-presentActive');
            past.classList.remove('past-presentActive');
        }
    }

  return (
    <div className='view-appealsPage'>
        <Navbar/>
        <div className='view-appealsHeader'>
            <h1>Appeals</h1>
            <div className='past-presentWrapper'>
                <a className='past-present' id='past' onClick={pastPresentOnClick}>Past</a>
                <a className='past-present past-presentActive' id='present' onClick={pastPresentOnClick}>Present</a>
            </div>
        </div>
        <div className='view-appealsBody'>
            {
                appeals
            }
        </div>
    </div>
  )
}

export default ViewAppeals