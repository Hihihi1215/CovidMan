import React from 'react'
import { useLocation } from 'react-router-dom'
import RegisterAppForm from '../components/RegisterAppForm'
import '../css/RegisterAidApplicant.css'
import { useOrganisation } from '../OrganisationContext';

function RegisterAidApplicant(props) {

  const location = useLocation();
  let { orgName, orgDocID } = useOrganisation();

  if(!orgName) {
    const state = location.state;
    orgName = state.orgName;
    orgDocID = state.orgDocID;
  }

  const blurThePage = () => {
    const registerAidApplicant = document.querySelector('.register-aidApplicant');
    registerAidApplicant.classList.toggle('blur');
  }

  const showCheckMarkAnimation = () => {
    const checkIcon = document.querySelector('.check-icon');
    const checkIconLabel = document.querySelector('.check-iconLabel');
    setTimeout(() => {
      checkIcon.style.display = 'block';
      checkIconLabel.style = `
        animation : none;
        border-color : #43c9ff;
        transition : border 1s ease-out
      `
    }, 1000);
  }

  return (

    <div className='register-aidApplicant'>
      <RegisterAppForm 
        orgName = {orgName}
        orgDocID = {orgDocID}
        blurThePage={blurThePage}
        showModal={props.showModal}
        showCheckMarkAnimation={showCheckMarkAnimation}/>
    </div>
  )
}

export default RegisterAidApplicant