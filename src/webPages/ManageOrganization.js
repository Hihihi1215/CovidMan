import React, {useEffect, useState} from "react";
import '../css/ManageOrganization.css'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import OrganisationCard from '../components/OrganisationCard';

function ManageOrganization(){

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
        <div className="manage-organization">
            <div className="manage-organizationHeader">
                <h1>Manage Organization</h1>
                <Button className="btn-addOrganization">Add New Organization</Button>
            </div>
            <div className="manage-organizationBody">
                {
                    organisations.map((organisation) => {
                        return (
                            <Link to='/' className='links'>
                                <OrganisationCard
                                    orgID={organisation.orgID}
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

export default ManageOrganization
