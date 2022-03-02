import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import '../css/AddOrganizationForm.css';
import FormControl from './FormControl'
import {faBuilding, faLocation} from '@fortawesome/free-solid-svg-icons';

function AddOrganizationForm(){

    const [ orgName, setOrgName ] = useState('');
    const [ orgAddress, setOrgAddress ] = useState('');

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

    const handleSubmit = e =>{
        if(!orgName || !orgAddress){
            e.preventDefault();
            if(!orgName){
                inputBlank('name')
            }else if(!orgAddress){
                inputBlank('address')
            }
        }
    }

    return(
        <div className="add-organization">
            <h4>Add New Organization</h4>
            <Form
                noValidate 
                onSubmit={handleSubmit}>
                <div>
                    <FormControl
                        icon={faBuilding}
                        input='name'
                        setInput={setOrgName}
                    />
                    <FormControl
                        icon={faLocation}
                        input='address'
                        as='textarea'
                        setInput={setOrgAddress}
                    />
                </div>
                <Button type='submit'>Add</Button>
            </Form>
        </div>
    )
}

export default AddOrganizationForm