import React from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../css/ViewOrgAppOffcanvas.css'
import ContributionCard from './ContributionCard'

function ViewOrgAppOffcanvas(props) {

    const navigate = useNavigate();

    const navigateToViewOrgApplicants = () => {
        navigate('/OrgRepHome/RecordAidDisbursement',
                    {
                        state : {
                            appealDocID : props.appealDocID
                        }
                    })
    }

  return (
    <Offcanvas 
        show={props.showContributions} 
        onHide={props.handleCloseContributions}
        placement='bottom'
        name='bottom'
        className='view-orgAppealsOffcanvas'>
        <Offcanvas.Header 
            closeButton>
            <Offcanvas.Title className='view-orgAppOffTitle'>Contributions</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
            className='view-orgAppOffBody'>
            <div className='view-orgAppOffBodyConWrapper'>
                <Button
                    variant='primary'
                    className='view-orgAppViewApplicantsBtn'
                    onClick={navigateToViewOrgApplicants}>
                    View Applicants
                </Button>
                <div className='view-orgAppOffContriWrapper'>
                    {props.contributions.map((contribution, i) => (
                        <ContributionCard
                            contributionID={contribution.contributionID}
                            receivedDate={contribution.receivedDate}
                            amount={contribution.amount}
                            contributionType={contribution.contributionType}
                            paymentChannel={contribution.paymentChannel}
                            referenceNo={contribution.referenceNo}
                            description={contribution.description}
                            estimatedValue={contribution.estimatedValue}/>
                    ))}
                </div>
            </div>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ViewOrgAppOffcanvas