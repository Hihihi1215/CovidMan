import React, { useEffect, useState } from 'react';
import '../css/RecordContribution.css'
import { useOrganisation } from '../OrganisationContext'
import { collection, getDocs, query, where } from 'firebase/firestore';
import AppealCard from '../components/AppealCard';
import { convertDateToTimestamp, db } from '../firebase';
import RecordContributionModal from '../components/RecordContributionModal';



function RecordContribution(){
    const { orgName, orgDocID } = useOrganisation();
    const [ appeals, setAppeals ] = useState([]);
    const [ showRecordModal, setShowRecordModal ] = useState(false);
    const [ appealID, setAppealID ] = useState('')
    const [ fromDate, setFromDate ] = useState('')
    const [ toDate, setToDate ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ appealDocID, setAppealDocID ] = useState('')
    const [ key, setKey ] = useState('');
    const [ recordComp, setRecordComp ] = useState([]);

    const today = new Date();
    const appealRef = collection(db, "appeals");
    const qry = query(appealRef, where("toDate", ">=", convertDateToTimestamp(today)), where("orgDocID", "==", orgDocID))

    useEffect(()=>{
        const getAppeals = async () => {
            const querySnapshot = await getDocs(qry)
            setAppeals(querySnapshot.docs.map((doc) => 
                ({
                    ...doc.data(),
                    id : doc.id
                })
            ))

            setRecordComp(appeals.map((appeal, i) =>{
                return (
                   <div onClick={() => setKey(i)}>
                        <AppealCard
                            appealID={appeal.appealID}
                            from={appeal.fromDate}
                            to={appeal.toDate}
                            description={appeal.description}
                        />
                   </div>
                )
            }))
        }
        getAppeals();
    }, [appeals])

    return (
        <div>
            <div className='record-contributionHeader'>
                <h3>{orgName} Organization</h3>
                <h4>Record Contribution</h4>
            </div>
            <div className='record-contributionBody'>
                {
                   recordComp
                }
            </div>
                {
                    appeals.map((appeal, i) =>{
                        return (
                            <RecordContributionModal
                                show={i === key}
                                onHide={() => setKey('')}
                                appealID={appeal.appealID}
                                fromDate={appeal.fromDate}
                                toDate={appeal.toDate}/>
                        )
                    })
                }
        </div>
    )
}

export default RecordContribution