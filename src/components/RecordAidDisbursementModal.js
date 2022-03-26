import { faCalendarDays, faClipboardList, faDollarSign, faGifts } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import '../css/RecordAidDisbursementModal.css'
import { createDisbursement } from '../firebase';
import RecAidModalFormControl from './RecAidModalFormControl'

function RecordAidDisbursementModal(props) {

    const [ cash, setCash ] = useState('');
    const [ disbursementDate, setDisbursementDate ] = useState('');
    const [ goodsValue, setGoodsValue ] = useState('');
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const valueRegex = /^[1-9]+[0-9]*$/;

    const testValue = (total, value) => {
        if(valueRegex.test(value)){
            let x = parseInt(value);
            return (x < 1 || x > total);
        } else {
            console.log('hi')
            return true;
        }
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

    const handleRecordAidDis = e => {
        if(!cash || !disbursementDate || !goodsValue) {
            e.preventDefault();
            if(!disbursementDate){
                inputBlank('disbursementDate');
            } else if(!cash) {
                inputBlank('cash')
            } else if(!goodsValue) {
                inputBlank('goodsValue')
            }
        } else {
            e.preventDefault();
            const disbursementDateObject = new Date(disbursementDate);
            const cashError = testValue(props.totalCash, cash);
            const goodsError = testValue(props.totalValue, goodsValue);
            if(disbursementDateObject < today || cashError || goodsError) {
                if( disbursementDateObject < today){
                    inputBlank('disbursementDate');
                } else if( cashError ){
                    inputBlank('cash')
                } else if(goodsError) {
                    inputBlank('goodsValue')
                }
            } else {
                const newTotalCash = newTotalValue(cash, props.totalCash);
                const newTotalEstimatedValue = newTotalValue(goodsValue, props.totalValue);
                props.setTotalOrgAppealCash(newTotalCash);
                props.setTotalOrgAppealValue(newTotalEstimatedValue);
                createDisbursement(disbursementDateObject, cash, goodsValue, props.appealDocID, props.orgAidAppDocID, newTotalCash, newTotalEstimatedValue);
                props.handleRecAidDisModalHide();
                props.handleShowToast();
            }
        }
    }

    const newTotalValue = (totalValue, disbursedValue) => {
        const totalValueInt = parseInt(totalValue)
        const totalDisbursedValueInt = parseInt(disbursedValue);
        return (totalDisbursedValueInt - totalValueInt);
    }


  return (
    <Modal
        show={props.recAidDisModalShow}
        onHide={props.handleRecAidDisModalHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="record-aidDisModalTitle">
                Record Aid Disbursement
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='record-aidDisModalBody'>
            <Form>
                <RecAidModalFormControl
                    input='disbursementDate'
                    setInput={setDisbursementDate}
                    icon={faCalendarDays}
                />
                <RecAidModalFormControl
                    input='cash'
                    setInput={setCash}
                    total={props.totalCash}
                    icon={faDollarSign}/>
                <RecAidModalFormControl
                    input='goodsValue'
                    setInput={setGoodsValue}
                    total={props.totalValue}
                    icon={faGifts}/>
                <Button 
                    className='record-aidDisModalRecordBtn' 
                    onClick={handleRecordAidDis}
                    type='submit'>Record</Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default RecordAidDisbursementModal