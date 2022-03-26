import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ViewOrgAppealCard from '../components/ViewOrgAppealCard';
import { convertDateToTimestamp, db } from '../firebase';
import { useOrganisation } from '../OrganisationContext'
import '../css/ViewOrgAppeals.css'
import ViewOrgAppOffcanvas from '../components/ViewOrgAppOffcanvas';

function ViewOrgAppeals() {

    const { orgName, orgDocID } = useOrganisation();
    const [ orgAppeals, setOrgAppeals ] = useState([]);
    const [showContributions, setShowContributions] = useState(false);
    const [ contributions, setContributions ] = useState([]);
    const [ appealDocID, setAppealDocID ] = useState('');

    const handleCloseContributions = () => setShowContributions(false);
    const handleShowContributions = () => setShowContributions(true);

    const today = new Date();
    today.setDate(today.getDate() - 1);
    const orgAppealsRef = collection(db, "appeals");
    const combinedQ = query(orgAppealsRef, where("toDate", ">=", convertDateToTimestamp(today)), where("orgDocID", "==", orgDocID));

    const getOrgAppeals = async () => {
        const querySnapshot = await getDocs(combinedQ);
        setOrgAppeals(querySnapshot.docs.map((doc) => 
            ({
                ...doc.data(),
                id : doc.id
            })
        ))
    }

    useEffect(() => {
        getOrgAppeals();
    }, [])

  return (
    <div className='view-orgAppeals'>
        <div className='view-orgAppealsHeader'>
            <h3 className='view-orgAppealsHeaderContent'>{orgName} Organisation</h3>
            <h4 className='view-orgAppealsHeaderContent'>Appeals</h4>
        </div>
        <div className='view-orgAppealsBody'>
            {
                orgAppeals.map((orgAppeal, i) => {
                    if(!orgAppeal.appealID)
                        return null
                    else
                        return (
                            <ViewOrgAppealCard
                                appealDocID={orgAppeal.id}
                                appealID={orgAppeal.appealID}
                                from={orgAppeal.fromDate}
                                to={orgAppeal.toDate}
                                description={orgAppeal.description}
                                showContributions={handleShowContributions}
                                setContributions={setContributions}
                                setAppealDocID={setAppealDocID}/>
                        )
                })
            }
            <ViewOrgAppOffcanvas
                appealDocID={appealDocID}
                contributions={contributions}
                showContributions={showContributions}
                handleCloseContributions={handleCloseContributions}/>
        </div>
    </div>
  )
}

export default ViewOrgAppeals