import React, { useEffect, useState } from 'react';
import OrganisationCard from '../components/OrganisationCard';
import '../css/SelectOrganisation.css';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';


function SelectOrganisation() {

    const [ organisations, setOrganisations ] = useState([]);

    useEffect(() => {
        const getOrganisations = async() => {
            const querySnapshot = await getDocs(collection(db, "organisation"));
            setOrganisations(querySnapshot.docs.map((doc) => (
                {
                    ...doc.data(),
                    id : doc.id
                }
            )));
        };

        getOrganisations();
    }, [organisations]);

  return (
    <div className='select-organisation'>
        <div className='select-organisationHeader'>
            <h1>Organisations</h1>
        </div>
        <div className='select-organisationBody'>
            {
                organisations.map((organisation) => {
                    return (
                        <Link to='/RegisterApp' className='links'>
                            <OrganisationCard
                                orgName={organisation.orgName}
                                orgAddress={organisation.orgAddress}/>
                        </Link>
                    )  
                })
            }
        </div>
    </div>
  )
}

export default SelectOrganisation