import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import '../css/RecordOutcomeModal.css'
import { updateAppealOutcome } from '../firebase';
import RecAidModalFormControl from './RecAidModalFormControl';

function RecordOutcomeModal(props) {

    const [ outcome, setOutcome ] = useState('');

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

    const handleRecordOutcome = e => {
        e.preventDefault();
        if(!outcome) {
            inputBlank('outcome');
        } else {
            updateAppealOutcome(props.appealDocID, outcome);
            props.handleRecOutcomeModalHide();
            props.showRecordSuccess();
            props.showCheckMarkAnimation();
        }
    }

  return (
    <Modal show={props.recOutcomeShow} onHide={props.handleRecOutcomeModalHide} centered>
        <Modal.Header closeButton className='record-outcome__header'>
          <Modal.Title className='record-outcome__title'>Record Outcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <RecAidModalFormControl
                            input='outcome'
                            setInput={setOutcome}
                            icon={faClipboardList}/>
                <Button 
                    className='record-outcome-modal__submit-btn' 
                    onClick={handleRecordOutcome}
                    type='submit'>Record</Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default RecordOutcomeModal