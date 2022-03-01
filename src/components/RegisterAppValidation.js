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

    const validationOrDuplicate = () => {
        if(props.duplicate){
            if(props.duplicate === 'id'){
                return 'There is already an existing user with the same ID'
            } else {
                return 'There is already an existing user with the same email'
            }
        } else {
            return fileOrNot();
        }
    }

  return (
    <div className='register-appValidation'>
        {validationOrDuplicate()} {registerAppInvalidFormat()}
    </div>
  )
}

export default RegisterAppValidation