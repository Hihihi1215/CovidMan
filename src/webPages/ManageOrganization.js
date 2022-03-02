import React, {useEffect, useState} from "react";
import '../css/ManageOrganization.css'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import OrganisationCard from '../components/OrganisationCard'
import Container from "../components/Container";

function ManageOrganization(){

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
        };

        getOrganisations();
    }, [organisations]);

    return (
        <div className="manage-organization">
            <div className="manage-organizationHeader">
                <h1>Manage Organization</h1>
                <div className="btn-addOrganization">
                    <Container eventType='add-organization' 
                        buttonText='Add New Organization'/>
                </div>
            </div>
            <div className="manage-organizationBody">
                {
                    organisations.map((organisation) => {
                        return (
                            <Container eventType='register-organizationRep'
                                org={organisation}/>
                        )  
                    })
                }
            </div>
        </div>
    )
}

export default ManageOrganization
