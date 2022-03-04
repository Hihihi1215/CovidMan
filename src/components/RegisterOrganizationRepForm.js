import React, {useState} from "react";
import '../css/RegisterOrganizationRep.css';
import {faUser, faEnvelope, faMobileScreenButton,faIdCard, faIdCardClip} from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from "react-bootstrap";
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
                        props.onShowConfimation()
                        props.onHide()
                        createOrganizationRep(username, name, email, mobileNo, jobtitle, props.organization.orgID, props.organization.id);
                    }
                })
            }
        }
    }

    /*const showAlertDialog = () => {
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
    }*/

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Register Organizaton Representative
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="title">{props.organization.orgName} Organization</h4>
          <Form noValidat>
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
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary">Close</Button>
            <Button onClick={handleSubmit} variant="primary">Register</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default RegisterOrganizationRep