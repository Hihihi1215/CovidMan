import { faDollarSign, faEnvelope, faHouse, faIdCard, faMobileScreenButton, faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../css/RegisterAppForm.css'
import FormControl from './FormControl'
import Dropzone from './Dropzone'
import RegisterAppFormPagination from './RegisterAppFormPagination'
import RegisterAppValidation from './RegisterAppValidation'
import { checkDuplicateUser, createAidApplicant } from '../firebase'

function RegisterAppForm(props) {

    const [ mobileNo, setMobileNo ] = useState('');
    const [ name, setName ] = useState('');
    const [ id, setId ] = useState('');
    const [ income, setIncome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ invalid, setInvalid ] = useState('');
    const [ duplicate, setDuplicate ] = useState('');
    const [ files, setFiles ] = useState([]);

    const idRegex = /\d{6}-\d{2}-\d{4}/;
    const emailRegex = /\w+@\w+.com/;
    const numRegex = /^[0-9]{1,3}$/;
    const mobileNoRegex = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/;    


    const testIncome = (theIncome) => {
        if(numRegex.test(theIncome)){
            let x = parseInt(theIncome);
            return (x < 0 || x > 999);
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
        setInvalid(inputGroupName);
        validation.classList.toggle('register-appValidationFadeIn');
        setTimeout(() => {
            validation.classList.toggle('register-appValidationFadeIn');
        }, 2000);
        input.style = `
            box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
            border: 1px solid #E66D7A;
        `;
        tooltip.style.display = 'block';
        input.value = '';
    }

    const duplicateInput = (duplicate) => {
        setDuplicate(duplicate);
        setInvalid(duplicate);
        const tooltip = document.querySelector(`#${duplicate}-tooltip3`);
        const input = document.querySelector(`#${duplicate}-input`);
        const validation = document.querySelector('.register-appValidation');
        validation.classList.toggle('register-appValidationFadeIn');
        setTimeout(() => {
            validation.classList.toggle('register-appValidationFadeIn');
        }, 2000);
        input.style = `
            box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
            border: 1px solid #E66D7A;
        `;
        tooltip.style.display = 'block';
        input.value = '';
    }

    const handleSubmit = e => {
        if(!name || !id || !income || !address || !mobileNo || !email || files.length == 0){
            e.preventDefault();
            if(!name) {
                inputBlank('name');
            } else if(!id) {
                inputBlank('id')
            } else if(!income) {
                inputBlank('income')
            } else if(!email) {
                inputBlank('email')
            } else if(!mobileNo){
                inputBlank('mobileNo');
            } else if(!address) {
                inputBlank('address')
            } else if(files.length == 0) {
                inputBlank('file');
            }
        } else {
            let incomeError = testIncome(income);
            if(!idRegex.test(id) || !emailRegex.test(email) || incomeError || !mobileNoRegex.test(mobileNo)){
                e.preventDefault();
                if(!idRegex.test(id)){
                    inputBlank('id');
                } else if(!emailRegex.test(email)){
                    inputBlank('email');
                } else if(!mobileNoRegex.test(mobileNo)){
                    inputBlank('mobileNo');
                } else if(incomeError){
                    inputBlank('income');
                }
            } else {
                e.preventDefault();
                checkDuplicateUser(id, email)
                        .then((duplicateOrNot) => {
                            if(duplicateOrNot){
                                duplicateInput(duplicateOrNot);
                            } else {
                                props.blurThePage();
                                props.showModal();
                                props.showCheckMarkAnimation();
                                createAidApplicant(name, id, income, email, mobileNo, address, files, props.orgDocID);
                            }
                        });
            }
        }
    }

  return (
    <div className='register-appFormWrapper fade-in-sign-in'>
        <h4>{props.orgName} Organisation</h4>
        <h5>Register Aid Applicant</h5>
        <Form 
            noValidate
            onSubmit={handleSubmit}
            >
            <div className='forms form1 fade-in-left'>
                <FormControl
                    icon={faUser}
                    input='name'
                    setInput={setName}
                    setInvalid={setInvalid}
                    setDuplicate={setDuplicate}
                    duplicate = {duplicate}
                />
                <FormControl
                    icon={faIdCard}
                    input='id'
                    setInput={setId}
                    setInvalid={setInvalid}
                    setDuplicate={setDuplicate}
                    duplicate = {duplicate}
                />
                <FormControl
                    icon={faDollarSign}
                    input='income'
                    setInput = {setIncome}
                    setInvalid={setInvalid}
                    setDuplicate={setDuplicate}
                    duplicate = {duplicate}
                />
                <FormControl
                    icon={faMobileScreenButton}
                    input='email'
                    setInput={setEmail}
                    setInvalid={setInvalid}
                    setDuplicate={setDuplicate}
                    duplicate = {duplicate}
                />
                <FormControl
                    icon={faEnvelope}
                    input='mobileNo'
                    setInput={setMobileNo}
                    setInvalid={setInvalid}
                    setDuplicate={setDuplicate}
                    duplicate = {duplicate}
                />
                <FormControl
                    icon={faHouse}
                    input='address'
                    as='textarea'
                    setInput={setAddress}
                    setInvalid={setInvalid}
                    setDuplicate={setDuplicate}
                    duplicate = {duplicate}
                />
            </div>
            <div className='forms form2 fade-in-left'>
                <h6>Upload Proof of Household Income</h6>
                <Dropzone setFiles={setFiles} setInvalid={setInvalid} invalid={invalid}/>
            </div>
            <RegisterAppValidation invalid={invalid} duplicate={duplicate}/>
            <Button type='submit' className='register-btn'>Register</Button>
        </Form>
        <RegisterAppFormPagination
                appFormNavigation={appFormNavigation}
            /> 
    </div>
  )
}

export default RegisterAppForm