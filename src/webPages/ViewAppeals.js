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
        return Promise.all(querySnapshot.docs.map((doc) => {
            const docData = { ...doc.data() };
            return getOrgByDocID(docData.orgDocID)
              .then((res) => ({
                ...docData,
                orgName : res.orgName, 
                orgAddress : res.orgAddress
              }))
            })
          );
    }

    useEffect(() => {
        getAppeals(">=")
            .then((res) => {
                setAppeals(res);
            });
    }, []);

    const pastPresentOnClick = e => {
        const past = document.querySelector('#past');
        const present = document.querySelector('#present');
        if(e.target.id === 'past'){
            past.classList.add('past-presentActive');
            present.classList.remove('past-presentActive');
            getAppeals("<")
                .then((res) => {
                    setAppeals(res);
                });
        } else if(e.target.id === 'present'){
            present.classList.add('past-presentActive');
            past.classList.remove('past-presentActive');
            getAppeals(">=")
                .then((res) => {
                    setAppeals(res);
                });
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
                appeals.map((appeal, i) => (
                    <AppealCard
                      key={appeal.appealID}
                      appealID={appeal.appealID}
                      from={appeal.fromDate}
                      to={appeal.toDate}
                      orgName={appeal.orgName}
                      orgAddress={appeal.orgAddress}
                      outcome={appeal.outcome}/>
                ))
            }
        </div>
    </div>
  )
}

export default ViewAppeals