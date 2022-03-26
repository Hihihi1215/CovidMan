import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import '../css/AidAppConfirmationModal.css';

function RecordOutcomeSuccess() {

  const navigate = useNavigate();

  const recOutcomeSuccess = () => {
    navigate('/OrgRepHome', { replace: true });
  }

  return (
    <div className='confirmation-modal'>
      {/* <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg> */}
      <label className='check-iconLabel'>
        <div className='check-icon'></div>
      </label>
      <h3 className='confirmation-modalWords'>Outcome Recorded Successfully!</h3>
      <Button onClick={recOutcomeSuccess} className='app-confirmationOkBtn'>OK</Button>
    </div>
  );
}

export default RecordOutcomeSuccess