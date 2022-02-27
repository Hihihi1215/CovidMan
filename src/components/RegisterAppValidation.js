import React from 'react'
import '../css/RegisterAppValidation.css';

function RegisterAppValidation(props) {

    const registerAppInvalidFormat = () => {
        if(props.invalid === 'id'){
            return ' in the format of XXXXXX-XX-XXXX';
        } else if(props.invalid === 'email'){
            return ' in the format of xxx@xxx.com';
        } else if(props.invalid === 'income'){
            return ' that is in the range of 0 - 4000'
        } else if(props.invalid === 'mobileNo'){
            return ' in the format of (+60)XXXXXXXXX';
        } else {
            return '';
        }
    }

    const fileOrNot = () => {
        return props.invalid === 'file'? 
            'Please upload your household income as a PDF file':
            `Please fill in a valid ${props.invalid}`
    }

  return (
    <div className='register-appValidation'>
        {fileOrNot()} {registerAppInvalidFormat()}
    </div>
  )
}

export default RegisterAppValidation