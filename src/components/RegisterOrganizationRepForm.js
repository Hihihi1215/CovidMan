import React, {useState} from "react";
import '../css/RegisterOrganizationRep.css';
import {faUser, faEnvelope, faMobileScreenButton,faIdCard, faIdCardClip} from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from "react-bootstrap";
import FormControl from "./FormControl";
import { checkDuplicateOrgRep, createOrganizationRep } from "../firebase";
import { confirmAlert } from "react-confirm-alert";
import FocusTrap from "focus-trap-react";

function RegisterOrganizationRep(props){
    const [username, setUsername ] = useState('')
    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [mobileNo, setMobileNo ] = useState('')
    const [jobtitle, setJobtitle] = useState('')
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
            }else{
                e.preventDefault();
                checkDuplicateOrgRep(username, email).then((duplicateOrNot)=>{
                    if(duplicateOrNot){
                        duplicateInput(duplicateOrNot);
                    }else{
                        showAlertDialog();
                        createOrganizationRep(username, name, email, mobileNo, jobtitle, props.organization.orgID, props.organization.id);
                    }
                })
            }
        }
    }

    const showAlertDialog = () => {
        props.closeModal()
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                  <FocusTrap>
                    <div className='custom-ui'>
                        <h4>Organizaion Represantative Register Successfully!</h4>
                        <p>An email has been send to <u>{email}</u> with the password</p>
                        <Button onClick={onClose}>OK</Button>
                    </div>
                  </FocusTrap>

              );
            },
            onClickOutside: () => {
                this.setShow(false)
            },
            overlayClassName: "modal-area"
          })
    }

    return(
        <div className="register-organizationRep">
            <h4>Register Organizaton Representative</h4>
            <h5>{props.organization.orgName} Organization</h5>
            <Form
                noValidate 
                onSubmit={handleSubmit}>
                <div>
                    <FormControl
                        icon={faUser}
                        input='username'
                        setInput={setUsername}
                        setDuplicate={setDuplicate}
                        duplicate = {duplicate}
                    />
                    <FormControl
                        icon={faIdCard}
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
                    <FormControl
                        icon={faIdCardClip}
                        input='jobtitle'
                        setInput={setJobtitle}
                        setDuplicate={setDuplicate}
                        duplicate = {duplicate}
                    />
                </div>
                <Button type='submit'>Register</Button>
            </Form>
        </div>
    )
}

export default RegisterOrganizationRep