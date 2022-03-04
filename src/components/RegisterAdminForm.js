import {faEnvelope, faUser, faIdCard, faMobileScreenButton} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import '../css/RegisterAdminForm.css'
import { checkDuplicateAdmin, createCovidManAdmin } from '../firebase';
import FormControl from './FormControl'

function RegisterAdminForm(props){
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ mobileNo, setMobileNo ] = useState('');
    const [ adminNo, setAdminNo ] = useState('');
    const [ duplicate, setDuplicate ] = useState('');
    const emailRegex = /\w+@\w+.com/;
    const mobileNoRegex = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/;

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

    const duplicateInput = (duplicate) => {
        setDuplicate(duplicate);
        const tooltip = document.querySelector(`#${duplicate}-tooltip3`);
        const input = document.querySelector(`#${duplicate}-input`);
        const validation = document.querySelector('.register-appValidation');
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
        if(!name || !email || !mobileNo || !adminNo){
            e.preventDefault();
            if(!name){
                inputBlank('name');
            }else if(!email){
                inputBlank('email');
            }else if(!mobileNo){
                inputBlank('mobileNo');
            }else if(!adminNo){
                inputBlank('adminNo');
            }
        }else{
            if(!emailRegex.test(email) || !mobileNoRegex.test(mobileNo)){
                e.preventDefault();
                if(!emailRegex.test(email)){
                    inputBlank('email')
                }else if(!mobileNoRegex.test(mobileNo)){
                    inputBlank('mobileNo')
                }
            }else{
                e.preventDefault();
                checkDuplicateAdmin(adminNo, email)
                        .then((duplicateOrNot)=>{
                            if(duplicateOrNot){
                                duplicateInput(duplicateOrNot);
                            } else {
                                props.blurThePage();
                                props.showModal();
                                props.showCheckMarkAnimation();
                                createCovidManAdmin(adminNo, name, email, mobileNo)
                            }
                        })
            }
        }
    }

   return (
    <div className="register-adminFormWrapper">
        <h4>Register as a CovidMan Admin</h4>
        <Form 
            noValidate
            onSubmit={handleSubmit}
            > 
            <div>
            <FormControl
                icon={faIdCard}
                input='adminNo'
                setInput={setAdminNo}
                setDuplicate={setDuplicate}
                duplicate = {duplicate}
            />
            <FormControl
                icon={faUser}
                input='name'
                setInput={setName}
                setDuplicate={setDuplicate}
                duplicate = {duplicate}
            />
            <FormControl
                icon={faEnvelope}
                input='email'
                setInput={setEmail}
                setDuplicate={setDuplicate}
                duplicate = {duplicate}
            />
            <FormControl
                icon={faMobileScreenButton}
                input='mobileNo'
                setInput={setMobileNo}
                setDuplicate={setDuplicate}
                duplicate = {duplicate}
            />
            </div>
            <Button type='submit'>Register</Button>
        </Form>
    </div>
   )
}

export default RegisterAdminForm