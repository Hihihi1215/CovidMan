import React, { useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { faNoteSticky, faGem, faDollarSign, faAsterisk, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import RecordContributionFormControl from "./RecordContributionFormControl";
import '../css/RecordContributionModal.css'
import { createCashContribution, createGoodsContribution } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

function RecordContributionModal(props){

    const [ description, setDescription ] = useState('')
    const [ estimatedValue, setEstimatedValue ] = useState();
    const [ amount, setAmount ] = useState();
    const [ referenceNo, setReferenceNo ] = useState('')
    const [key, setKey] = useState('goods');
    const [ paymentChannel, setPaymentChannel ] = useState('');
    const [ colorError, setColorError] = useState(false);
    const numRegex = /^[1-9]+[0-9]*$/;

    const testValue = (theValue) => {
        if(numRegex.test(theValue)){
            let x = parseInt(theValue);
            return (x <= 0);
        } else {
            return true;
        }
    }

    const paymentChannelOptions = [
        {value:'', label:'Select a payment channel', isDisabled: true},
        {
            value:'cash',
            label:(
                <>
                    <FontAwesomeIcon icon={faMoneyBill} />
                    <span style={{ paddingLeft: "10px" }}>Cash</span>
                </>
            )
        },
        {
            value:'paypal',
            label:(
                <>
                    <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 384 512"><path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/></svg>
                    <span style={{ paddingLeft: "10px" }}>Paypal <span style={{marginLeft : "100px" }}>covidMan@business.example.com</span></span>
                </>
            )
        }
    ]

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

    const handleSelectedValue = e => {
        setPaymentChannel(e.value)
        setColorError(false)
    }

    const handleSubmit = e =>{
        if(key === 'goods'){
            recordGoodsContribution()
        }else{
            recordCashContribution()
        }
    }

    const recordGoodsContribution = () =>{
        if(!description || !estimatedValue){
            if(!description){
                inputBlank('description')
            }else if (!estimatedValue){
                inputBlank('estimatedValue')
            }
        }else{
            if(numRegex.test(estimatedValue)){
                props.onShowConfimation()
                props.onHide()
                createGoodsContribution(description, Number(estimatedValue), props.appealDocID)
            } else {
                inputBlank('estimatedValue')
            }
        }
    }

    const recordCashContribution = () =>{
        if(!referenceNo || !amount || !paymentChannel){
            if(!paymentChannel){
                setColorError(true)
            }else if(!referenceNo){
                inputBlank('referenceNo')
            }else if(!amount){
                inputBlank('amount')
            }
        }else{
            props.onShowConfimation()
            props.onHide()
            createCashContribution(paymentChannel, referenceNo, Number(amount), props.appealDocID)
        }
    }

    const handleOnShow = () => {
        setPaymentChannel('')
        setKey('goods')
        setColorError(false)
    }

    return (
        <div>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onShow={handleOnShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Record Contribution
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="view-currentAppeal">
                        <p><b>AppealID :</b> {props.appealID}</p>
                        <p><b>From Date : </b>{props.fromDate.toDate().toLocaleDateString()}</p>
                        <p><b>To Date : </b>{props.toDate.toDate().toLocaleDateString()}</p>
                    </div>
                    <Tabs defaultActiveKey='goods' onSelect={(k)=>setKey(k)}>
                        <Tab eventKey='goods' title="Goods">
                            <Form>
                                <RecordContributionFormControl
                                    icon={faNoteSticky}
                                    input='description'
                                    as='textarea'
                                    setInput={setDescription}
                                />
                                <RecordContributionFormControl
                                    icon={faGem}
                                    input='estimatedValue'
                                    setInput={setEstimatedValue}
                                />
                            </Form>
                        </Tab>
                        <Tab eventKey='cash' title="Cash">
                           <Form>
                                <Select 
                                    className='select-paymentChannel'
                                    placeholder="Select a payment channel"
                                    onChange={handleSelectedValue}
                                    options={paymentChannelOptions}
                                    styles={{
                                        control: (provided, state) => (colorError ? {
                                            ...provided, borderColor: 'red', 
                                        } : provided)
                                    }}
                                />
                                <RecordContributionFormControl
                                    icon={faAsterisk}
                                    input='referenceNo'
                                    setInput={setReferenceNo}
                                />
                                <RecordContributionFormControl
                                    icon={faDollarSign}
                                    input='amount'
                                    setInput={setAmount}
                                />
                               
                           </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary">Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Record</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RecordContributionModal