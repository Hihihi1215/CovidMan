import React, {useState} from "react";
import '../css/RegisterOrganizationRep.css';
import {faUser, faEnvelope, faMobileScreenButton,faIdCard, faIdCardClip} from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from "react-bootstrap";
import FormControl from "./FormControl";

function RegisterOrganizationRep(props){
    const [username, setUsername ] = useState('')
    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [mobileNo, setMobileNo ] = useState('')
    const [jobtitle, setJobtitle] = useState('')
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

    const handleSubmit = e =>{
        if(!username || !name || !email || !mobileNo || ! jobtitle ){
            e.preventDefault();
            if(!username){
                inputBlank("username")
            }else if(!name){
                inputBlank('name')
            }else if(!email){
                inputBlank('email')
            }else if(!mobileNo){
                inputBlank('mobileNo')
            }else if(!jobtitle){
                inputBlank('jobtitle')
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

    return(
        <div className="register-organizationRep">
            <h4>Register Organizaton Representative</h4>
            <h5>{props.orgName} Organization</h5>
            <Form
                noValidate 
                onSubmit={handleSubmit}>
                <div>
                    <FormControl
                        icon={faUser}
                        input='username'
                        setInput={setUsername}
                    />
                    <FormControl
                        icon={faIdCard}
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
                        icon={faIdCardClip}
                        input='jobtitle'
                        setInput={setJobtitle}
                    />
                </div>
                <Button type='submit'>Register</Button>
            </Form>
        </div>
    )
}

export default RegisterOrganizationRep