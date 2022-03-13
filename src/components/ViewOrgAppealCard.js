import React from 'react'
import AppealCard from './AppealCard'
import '../css/ViewOrgAppealCard.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

function ViewOrgAppealCard(props) {

    const contributionsRef = collection(db, "contributions");

    const handleViewOrgAppCardClick = async () => {
        const q = query(contributionsRef, where("appealDocID", "==", props.appealDocID));
        props.setAppealDocID(props.appealDocID);
        const querySnapshot = await getDocs(q);
        props.setContributions(querySnapshot.docs.map((doc) => ({
            ...doc.data()
        })))
        props.showContributions();
    }

  return (
    <div className='view-orgAppealCardWrapper' onClick={handleViewOrgAppCardClick}>
        <AppealCard
            appealID={props.appealID}
            from={props.from}
            to={props.to}
            description={props.description}/>
    </div>
  )
}

export default ViewOrgAppealCard