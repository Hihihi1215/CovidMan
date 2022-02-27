import React from 'react'
import { Button } from 'react-bootstrap'
import '../css/RegisterAppFormPagination.css'

function RegisterAppFormPagination(props) {

    const handlePaginationClick = e => {
        if(e.target.id === 'prev-btn'){
            props.appFormNavigation('prev');
        } else if(e.target.id === 'next-btn'){
            props.appFormNavigation('next');
        }
    }

  return (
    <div className='pagination-btnWrapper'>
        <Button 
            id='prev-btn' 
            className='pagination-btn'
            onClick={handlePaginationClick}
            >
            Previous
        </Button>
        <Button 
            id='next-btn' 
            className='pagination-btn'
            onClick={handlePaginationClick}>
            Next
        </Button>
    </div>
  )
}

export default RegisterAppFormPagination