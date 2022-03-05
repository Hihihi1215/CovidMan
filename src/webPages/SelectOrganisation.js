import React, { useEffect, useState } from 'react';
import OrganisationCard from '../components/OrganisationCard';
import '../css/SelectOrganisation.css';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';


function SelectOrganisation() {

    const [ organisationComponents, setOrganisationComponents ] = useState([]);
    const [ organisations, setOrganisations ] = useState([]);

    useEffect(() => {
        const getOrganisations = async() => {
            const querySnapshot = await getDocs(collection(db, "organisations"));
            setOrganisations(querySnapshot.docs.map((doc) => (
                {
                    ...doc.data(),
                    id : doc.id
                }
            )));
            setOrganisationComponents(organisations.map((organisation, i) => {
                return (
                    <CSSTransition
                        key={i}
                        classNames="org-anim"
                        timeout={500}>
                        <OrganisationCard
                            orgID = {organisation.orgID}
                            orgDocID = {organisation.id}
                            orgName={organisation.orgName}
                            orgAddress={organisation.orgAddress}/>
                    </CSSTransition>
                )
            }))
        };

        getOrganisations();
    }, [organisations]);

  return (
    <div className='select-organisation'>
        <div className='select-organisationHeader'>
            <h1>Organisations</h1>
        </div>
        <div className='select-organisationBody'>
            <TransitionGroup component={null}>
                {organisationComponents}
            </TransitionGroup>
        </div>
    </div>
  )
}

export default SelectOrganisation