import React, {useEffect, useState} from "react";
import '../css/ManageOrganization.css'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Button } from "react-bootstrap";
import AddOrganizationForm from "../components/AddOrganizationForm";
import ConfirmationDialog from "../components/ConfimationDialog";

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganisationCard2 from "../components/OrganisationCard2";
import RegisterOrganizationRep from "../components/RegisterOrganizationRepForm";

function ManageOrganization(){
    const [ organisationComponents, setOrganisationComponents ] = useState([]);
    const [ organisations, setOrganisations ] = useState([]);
    const [showAddOrg, setShowAddOrg] = React.useState(false);
    const [confimationModalShow, setConfimationModalShow] = React.useState(false);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [ showformModel, setShowFormModel ] = useState('');
    
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

                        <OrganisationCard2
                            onClick={()=>setShowFormModel(i)}
                            organization={organisation}/>
                        
                    </CSSTransition>
                )
            }))
            
        };

        getOrganisations();
    }, [organisations]);

    const addOrgConfirm = () => {
        setConfimationModalShow(true)
        setTitle('Added Successfully')
        setBody('A new organization has been added successfully')
    }

    const registerOrgRepConfirm = () => {
        setConfimationModalShow(true)
        setTitle('Organizaion Represantative Register Successfully!')
        setBody('An email has been sent with the password')
    }
    

    return (
        <div className="manage-organization">

            <div className="manage-organizationHeader">
                <h1>Manage Organization</h1>
                <div className="btn-addOrganization">
                    <Button onClick={() => setShowAddOrg(true)}>Add New Organization</Button>
                </div>
            </div>
            <div className="manage-organizationBody">
            <TransitionGroup component={null}>
                {organisationComponents}
            </TransitionGroup>
            </div>

            {
                organisations.map((organisation, i) =>{
                    return (
                        <RegisterOrganizationRep
                            organization={organisation}
                            show={i === showformModel}
                            onHide={() => setShowFormModel('')}
                            onShowConfimation={() => registerOrgRepConfirm()}/>
                    )
                })
            }

            <AddOrganizationForm
                show={showAddOrg}
                onHide={() => setShowAddOrg(false)}
                onShowConfimation={() => 
                    addOrgConfirm()}/>
            
            <ConfirmationDialog 
                show={confimationModalShow}
                onHide={() => setConfimationModalShow(false)}
                title={title}
                body={body}/>
        </div>
    )
}

export default ManageOrganization
