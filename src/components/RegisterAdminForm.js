import {faEnvelope, faUser, faIdCard, faMobileScreenButton} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import '../css/RegisterAdminForm.css'
import FormControl from './FormControl'

function RegisterAdminForm(){
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ mobileNo, setMobileNo ] = useState('');
    const [ adminNo, setAdminNo ] = useState('');
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
                icon={faUser}
                input='name'
                setInput={setName}
            />
            <FormControl
                icon={faEnvelope}
                input='email'
                setInput={setEmail}
            />
            <FormControl
                icon={faMobileScreenButton}
                input='mobileNo'
                setInput={setMobileNo}
            />
            <FormControl
                icon={faIdCard}
                input='adminNo'
                setInput={setAdminNo}
            />
            </div>
            <Button type='submit'>Register</Button>
        </Form>
    </div>
   )
}

export default RegisterAdminForm