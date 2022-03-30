import React from 'react'
import { Link } from 'react-router-dom'
import '../css/SignUp.css'

function SignUp() {
  return (
    <div className='signup-page'>
        <div className='signup-as__wrapper'>
            <h3>Sign Up As?</h3>
            <div className='signup-as__body'>
                <Link to='/RegisterAdmin' className='signup-page__links signup-page__links--admin'>Covid Man Admin</Link>
                <Link to='/SelectOrg' className='signup-page__links signup-page__links--aid-app'>Aid Applicant</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp