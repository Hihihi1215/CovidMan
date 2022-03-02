import React, {Component} from "react";
import { Button } from "react-bootstrap";
import Modal from "./Modal";
import OrganisationCard from '../components/OrganisationCard'

export class Container extends Component{
    state = { isShown: false };
    showModal = () => {
      this.setState({ isShown: true }, () => {
        this.closeButton.focus();
        this.render()
      });
      this.toggleScrollLock();
    };
    closeModal = () => {
        this.setState({ isShown: false });
        this.TriggerButton.focus();
        this.toggleScrollLock();
    };
    onKeyDown = (event) => {
        if (event.keyCode === 27) {
            this.closeModal();
        }
    };
    onClickOutside = (event) => {
        if (this.modal && this.modal.contains(event.target)) return;
        this.closeModal();
    };
  
    toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };
    render() {
        return (
            <React.Fragment>
                {this.props.eventType == 'register-organizationRep'?
                    (
                        <OrganisationCard
                            onClick={this.showModal}
                            orgID={this.props.org.orgID}
                            orgName={this.props.org.orgName}
                            orgAddress={this.props.org.orgAddress}/>
                    )
                     : 
                    (
                        <Button
                        buttonRef={(n) => (this.Button = n)}
                        onClick={this.showModal}
                        >
                        {this.props.buttonText}
                        </Button>
                    )
                };
                
                {this.state.isShown ? (
                    <Modal
                        eventType={this.props.eventType}
                        modalRef={(n) => (this.modal = n)}
                        buttonRef={(n) => (this.closeButton = n)}
                        closeModal={this.closeModal}
                        onKeyDown={this.onKeyDown}
                        onClickOutside={this.onClickOutside}
                        organizationName={this.props.org.orgName}
                    />
                ): null}
            </React.Fragment>
        )
    }
}

export default Container