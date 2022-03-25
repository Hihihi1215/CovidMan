import React from 'react';
import OrganizeAppealForm from '../components/OrganizeAppealForm';
import '../css/OrganizeAidAppeal.css'

function OrganizeAidAppeal(props){
    const blurThePage = () => {
        const registerCovidManAdmin = document.querySelector('.organize-aidAppeal');
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

    return(
        <div className='organize-aidAppeal'> 
            <OrganizeAppealForm
                blurThePage={blurThePage}
                showModal={props.showModal}
                showCheckMarkAnimation={showCheckMarkAnimation}/>
        </div>
    )
}

export default OrganizeAidAppeal