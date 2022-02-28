import { faDollarSign, faEnvelope, faHouse, faIdCard, faMobileScreenButton, faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../css/RegisterAppForm.css'
import FormControl from './FormControl'
import Dropzone from './Dropzone'
import RegisterAppFormPagination from './RegisterAppFormPagination'
import RegisterAppValidation from './RegisterAppValidation'
import { checkDuplicateUser } from '../firebase'

function RegisterAppForm() {

    const [ mobileNo, setMobileNo ] = useState('');
    const [ name, setName ] = useState('');
    const [ id, setId ] = useState('');
    const [ income, setIncome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ invalid, setInvalid ] = useState('');
    const [ files, setFiles ] = useState([]);
    const idRegex = /\d{6}-\d{2}-\d{4}/;
    const emailRegex = /\w+@\w+.com/;
    const numRegex = /^[1-9]{1,3}$/;
    const mobileNoRegex = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/;

    const testIncome = (theIncome) => {
        if(numRegex.test(theIncome)){
            let x = parseInt(theIncome);
            return (x >= 0.001 && x <= 0.009);
        } else {
            return true;
        }
    }

    const appFormNavigation = (nextOrPrev) => {
        const nextBtn = document.querySelector('#next-btn');
        const prevBtn = document.querySelector('#prev-btn');
        const registerBtn = document.querySelector('.register-btn')
        const form1 = document.querySelector('.form1');
        const form2 = document.querySelector('.form2');
        const validation = document.querySelector('.register-appValidation');
        if(invalid){
            validation.classList.toggle('register-appValidationFadeIn');
        }
        if(nextOrPrev === 'next'){
            nextBtn.classList.toggle('pagination-fadeOut');
            prevBtn.classList.toggle('pagination-fadeIn');
            registerBtn.classList.toggle('register-btnFadeIn');
            form1.style.display = 'none';
            form2.style.display = 'flex';
            setTimeout(() => {
                nextBtn.style = `
                    pointer-events : none;
                    cursor : default;
                `
                prevBtn.style = `
                    pointer-events : auto;
                    cursor : pointer;
                `
                registerBtn.style = `
                    pointer-events : auto;
                    cursor : pointer;
                `
            },200)
        } else if(nextOrPrev === 'prev'){
            nextBtn.classList.toggle('pagination-fadeOut');
            prevBtn.classList.toggle('pagination-fadeIn');
            registerBtn.classList.toggle('register-btnFadeIn');
            setTimeout(() => {
                nextBtn.style = `
                    pointer-events : auto;
                    cursor : pointer;
                `
                prevBtn.style = `
                    pointer-events : none;
                    cursor : default;
                `
                registerBtn.style = `
                    pointer-events : none;
                    cursor : default;
                `
            },200)
            form1.style.display = 'block';
            form2.style.display = 'none';
        }
    }

    const inputBlank = (inputGroupName) => {
        const tooltip = document.querySelector(`#${inputGroupName}-tooltip`);
        const input = document.querySelector(`#${inputGroupName}-input`);
        const validation = document.querySelector('.register-appValidation');
        input.style = `
            box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
            border: 1px solid #E66D7A;
        `;
        tooltip.style.display = 'block';
        input.value = '';
        input.focus();
        setInvalid(inputGroupName);
        validation.classList.toggle('register-appValidationFadeIn');
    }

    const handleSubmit = e => {
        if(!name || !id || !income || !address || !email || files.length == 0 || !mobileNo){
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
            } else if(files.length == 0) {
                const validation = document.querySelector('.register-appValidation');
                setInvalid('file');
                validation.classList.toggle('register-appValidationFadeIn');
            } else if(!mobileNo){
                inputBlank('mobileNo');
            }
        } else {
            let incomeError = testIncome(income);
            if(!idRegex.test(id) || !emailRegex.test(email) || incomeError || !mobileNoRegex.test(mobileNo)){
                e.preventDefault();
                if(!idRegex.test(id)){
                    inputBlank('id');
                } else if(!emailRegex.test(email)){
                    inputBlank('email');
                } else if(incomeError){
                    inputBlank('income');
                } else if(!mobileNoRegex.test(mobileNo)){
                    inputBlank('mobileNo');
                }
            } else {
                e.preventDefault();
                var duplicateOrNot = 0;
                checkDuplicateUser(id, email)
                    .then(res => {
                        duplicateOrNot = res;
                    });
                if(duplicateOrNot){
                    console.log('its a duplicate');
                } else {
                    console.log('lmao');
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
                    setInvalid={setInvalid}
                />
                <FormControl
                    icon={faIdCard}
                    input='id'
                    setInput={setId}
                    setInvalid={setInvalid}
                />
                <FormControl
                    icon={faDollarSign}
                    input='income'
                    setInput = {setIncome}
                    setInvalid={setInvalid}
                />
                <FormControl
                    icon={faMobileScreenButton}
                    input='email'
                    setInput={setEmail}
                    setInvalid={setInvalid}
                />
                <FormControl
                    icon={faEnvelope}
                    input='mobileNo'
                    setInput={setMobileNo}
                    setInvalid={setInvalid}
                />
                <FormControl
                    icon={faHouse}
                    input='address'
                    as='textarea'
                    setInput={setAddress}
                    setInvalid={setInvalid}
                />
            </div>
            <div className='forms form2'>
                <h6>Upload Proof of Household Income</h6>
                <Dropzone setFiles={setFiles} setInvalid={setInvalid} invalid={invalid}/>
            </div>
            <RegisterAppValidation invalid={invalid}/>
            <Button type='submit' className='register-btn'>Register</Button>
        </Form>
        <RegisterAppFormPagination
                appFormNavigation={appFormNavigation}
            /> 
    </div>
  )
}

export default RegisterAppForm