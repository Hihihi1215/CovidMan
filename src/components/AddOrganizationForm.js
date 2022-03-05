import React, {useState} from "react";
import { Button, Form,InputGroup, Modal } from "react-bootstrap";
import '../css/AddOrganizationForm.css';
import FormControl from './FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faLocation} from '@fortawesome/free-solid-svg-icons';
import { checkDuplicateOrganization, createNewOrganization } from "../firebase";
import { confirmAlert } from "react-confirm-alert";
import FocusTrap from "focus-trap-react";

function AddOrganizationForm(props){

    const [ orgName, setOrgName ] = useState('');
    const [ orgAddress, setOrgAddress ] = useState('');

    const handleChange = e => {
        setOrgName(e.target.value)
        orgNameFilled();
      }

      const orgNameFilled = () => {
        const usernameTooltip = document.querySelector('#orgName-tooltip');
        const usernameInput = document.querySelector('#orgName-input');
        usernameInput.style = `
          box-shadow: 0.5px 0.5px 0.5px 4px #C5E1D4;
          border: 1px solid #85BFA4;
          animation : inputBoxGreenFadeout 0.4s 3.65s ease-out;
        `;
        setTimeout(() => {
          usernameInput.style = `
            box-shadow: none;
            border: 1px solid #ced4da;
          `;
        }, 4000);
        usernameTooltip.style.display = 'none';
      }

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

    const orgNameBlank = () =>{
        const usernameTooltip = document.querySelector('#orgName-tooltip');
        const usernameInput = document.querySelector('#orgName-input');
        usernameInput.style = `
          box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
          border: 1px solid #E66D7A;
        `;
        usernameTooltip.style.display = 'block';
        return usernameInput;
      }

    const invalidOrgName = () => {
        const usernameTooltip2 = document.querySelector('#orgName-tooltip2');
        const usernameInput = document.querySelector('#orgName-input');
        usernameInput.style = `
          box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
          border: 1px solid #E66D7A;
        `;
        usernameInput.value = '';
        usernameInput.focus();
        usernameTooltip2.style.display = 'block';
        usernameTooltip2.style.animation = 'fadeOut 0.4s 3.65s ease-out';
        setTimeout(() => {
          usernameTooltip2.style.display = 'none';
        }, 4000);
      }

    const handleSubmit = e =>{
        if(!orgName || !orgAddress){
            e.preventDefault();
            if(!orgName){
                orgNameBlank();
            }else if(!orgAddress){
                inputBlank('address')
            }
        }else{
            e.preventDefault();
            checkDuplicateOrganization(orgName).then((duplicateOrNot) => {
                if(duplicateOrNot){
                    invalidOrgName();
                }else{
                    props.onShowConfimation()
                    props.onHide()
                    createNewOrganization(orgName, orgAddress)
                }
            })
        }
    }

    /*const showAlertDialog = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                   <div className='custom-ui'>
                        <h4>Added Successfully</h4>
                        <p>A new organization has been added successfully</p>
                        <Button onClick={onClose}>OK</Button>
                    </div>

              );
            },
            overlayClassName:"model"
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
            Add New Organization
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate>
                <div>
                    <InputGroup hasValidation>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faBuilding}/>
                        </InputGroup.Text>
                        <Form.Floating>
                            <Form.Control
                                id="orgName-input"
                                placeholder='Name'
                                type='text'
                                required
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            <label className='input-label'>Name</label>
                        </Form.Floating>
                      <Form.Control.Feedback 
                            type='invalid' 
                            tooltip
                            id='orgName-tooltip'>
                            Please fill in the organization name
                        </Form.Control.Feedback>
                        <Form.Control.Feedback
                            type='invalid'
                            tooltip
                            id='orgName-tooltip2'
                        >
                        There is an existing organization with the same name
                        </Form.Control.Feedback>
                    </InputGroup>
                    <FormControl
                        icon={faLocation}
                        input='address'
                        as='textarea'
                        setInput={setOrgAddress}
                    />
                </div>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant="secondary" className="btn">Close</Button>
            <Button onClick={handleSubmit} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    );

}

export default AddOrganizationForm