import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import '../css/OrganizeAppealForm.css'
import { faCalendarDays, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import OrganizeApepalFormControl from "./OrganizeAppealFormControl";
import { useOrganisation } from '../OrganisationContext'
import { createAidAppeal } from "../firebase";

function OrganizeAppealForm(props){

    const [fromDate, setFromDate ] = useState('');
    const [ toDate, setTodate ] = useState('');
    const [ description, setDescription ] = useState('');
    const { orgName, orgDocID } = useOrganisation();
    const today = new Date();

    const inputBlank = (inputGroupName) => {
        const tooltip = document.querySelector(`#${inputGroupName}-tooltip`);
        const input = document.querySelector(`#${inputGroupName}-input`);
        input.style = `
            box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
            border: 1px solid #E66D7A;
        `;
        tooltip.style.display = 'block';
        input.value = '';
        input.focus();
    }

    const handleChange = e =>{
        if(!fromDate || !toDate || !description){
            e.preventDefault();
            if(!fromDate){
                inputBlank('fromDate')
            }else if(!toDate){
                inputBlank('toDate')
            }else if(!description){
                inputBlank('description')
            }
        }else{
            const fromDateObject = new Date(fromDate);
            const toDateObject = new Date(toDate);
            if(fromDateObject < today){
                e.preventDefault();
                inputBlank('fromDate')
            }else{
                props.blurThePage();
                props.showModal();
                props.showCheckMarkAnimation();
                createAidAppeal(fromDateObject, toDateObject, description, orgDocID)
            }
        }
    }

    return(
        <div className="organize-appealFormWrapper">
            <h3>Organize Aid Appeal</h3>
            <h4>{orgName} organization</h4>
            <Form>
                <OrganizeApepalFormControl
                    input='fromDate'
                    setInput={setFromDate}
                    icon={faCalendarDays}
                />
                <OrganizeApepalFormControl
                    input='toDate'
                    setInput={setTodate}
                    icon={faCalendarDays}
                />
                <OrganizeApepalFormControl
                    input='description'
                    setInput={setDescription}
                    as='textarea'
                    icon={faNoteSticky}

                />
                <Button 
                    onClick={handleChange} 
                    className='btn-organize'>Organize</Button>
            </Form>
        </div>
    )
}

export default OrganizeAppealForm