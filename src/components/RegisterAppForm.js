import { faDollarSign, faEnvelope, faHouse, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../css/RegisterAppForm.css'
import FormControl from './FormControl'

function RegisterAppForm() {

    const [ name, setName ] = useState('');
    const [ id, setId ] = useState('');
    const [ income, setIncome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');
    const idRegex = /\d{6}-\d{2}-\d{4}/;
    const emailRegex = /\w+@\w+.com/;
    const numRegex = /^\d+$/;

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

    const handleSubmit = e => {
        console.log(income.toString())
        if(!name || !id || !income || !address || !email){
            e.preventDefault();
            if(!name) {
                inputBlank('name');
            } else if(!id) {
                inputBlank('id')
            } else if(!income) {
                inputBlank('income')
            } else if(!email) {
                inputBlank('email')
            } else if(!address) {
                inputBlank('address')
            }
        } else {
            if(!idRegex.test(id) || !emailRegex.test(email) || !numRegex.test(income.toString())){
                e.preventDefault();
                if(!idRegex.test(id)){
                    inputBlank('id');
                } else if(!emailRegex.test(email)){
                    inputBlank('email');
                } else if(!numRegex.test(income.toString())){
                    console.log(income)
                    inputBlank('income');
                }
            }
        }
    }

  return (
    <div className='register-appFormWrapper'>
        <h4>Hi Organisation</h4>
        <h5>Register Aid Applicant</h5>
        <Form 
            noValidate
            onSubmit={handleSubmit}
            >
            <div className='forms form1'>
                <FormControl
                    icon={faUser}
                    input='name'
                    setInput={setName}
                />
                <FormControl
                    icon={faIdCard}
                    input='id'
                    setInput={setId}
                />
                <FormControl
                    icon={faDollarSign}
                    input='income'
                    setInput = {setIncome}
                />
                <FormControl
                    icon={faEnvelope}
                    input='email'
                    setInput={setEmail}
                />
                <FormControl
                    icon={faHouse}
                    input='address'
                    as='textarea'
                    setInput={setAddress}
                />
            </div>
            <div className='forms form2'>
                <h6>Upload Proof of Household Income</h6>
            </div>
            <div className='pagination-btnWrapper'>
                <Button id='prev-btn' className='pagination-btn'>Previous</Button>
                <Button id='next-btn' className='pagination-btn'>Next</Button>
            </div>
        </Form>
    </div>
  )
}

export default RegisterAppForm