import React from "react";
import ReactDOM from "react-dom";
import AddOrganizationForm from "./AddOrganizationForm";
import FocusTrap from 'focus-trap-react';
import { Button } from "react-bootstrap";
import '../css/Modal.css';
import RegisterOrganizationRep from "./RegisterOrganizationRepForm";

function Modal(props){
    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tag="aside"
                role='dialog'
                tabIndex='-1'
                aria-modal='true'
                className="modal-cover"
                onClick={props.onClickOutside}
                onKeyDown={props.onKeyDown}
            >
                <div className="modal-area" ref={props.modalRef}>
                    <Button
                        ref={props.buttonRef}
                        aria-label='Close Model'
                        aria-labelledby="close-modal"
                        className="_modal-close"
                        onClick={props.closeModal}
                    >
                        <span id="close-modal" className="_hide-visual">
                            Close
                        </span>
                        <svg className="_modal-close-icon" viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                    </Button>
                    <div className="modal-body">
                        {props.eventType == 'register-organizationRep'?
                            <RegisterOrganizationRep organization={props.organization} closeModal={props.closeModal}/> : 
                            <AddOrganizationForm closeModal={props.closeModal}/>
                        };
                    </div>
                </div>
            </aside>
        </FocusTrap>, 
        document.body
    )
}

export default Modal