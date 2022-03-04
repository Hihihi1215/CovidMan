import React from "react";
import RegisterAdminForm from '../components/RegisterAdminForm'
import '../css/RegisterCovidManAdmin.css'

function RegisterCovidManAdmin(props){

    const blurThePage = () => {
        const registerCovidManAdmin = document.querySelector('.register-covidManAdmin');
        registerCovidManAdmin.classList.toggle('blur');
      }
    
      const showCheckMarkAnimation = () => {
        const checkIcon = document.querySelector('.check-icon');
        const checkIconLabel = document.querySelector('.check-iconLabel');
        setTimeout(() => {
          checkIcon.style.display = 'block';
          checkIconLabel.style = `
            animation : none;
            border-color : #43c9ff;
            transition : border 1s ease-out
          `
        }, 1000);
      }

    return (
        <div className="register-covidManAdmin">
            <RegisterAdminForm
                blurThePage={blurThePage}
                showModal={props.showModal}
                showCheckMarkAnimation={showCheckMarkAnimation}/>
        </div>
    )
}

export default RegisterCovidManAdmin