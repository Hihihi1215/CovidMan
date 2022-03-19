import React, { useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { faNoteSticky, faGem, faDollarSign, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import RecordContributionFormControl from "./RecordContributionFormControl";
import '../css/RecordContributionModal.css'

function RecordContributionModal(props){

    const [ description, setDescription ] = useState('')
    const [ estimatedValue, setEstimatedValue ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ referenceNo, setReferenceNo ] = useState('')

    return (
        <div>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
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
                    <Tabs defaultActiveKey="goods" >
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
                                <Form.Select>
                                    <option>choose a payment method</option>
                                    <option value="cash">Cash</option>
                                    <option value="paypal">Paypal</option>
                                </Form.Select>
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
                <Button variant="primary" >Record</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RecordContributionModal