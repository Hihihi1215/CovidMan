import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import '../css/SignIn.css'
import { auth, getOrgByDocID, getUserByUID, getUserByUsername} from '../firebase'
import { useOrganisationUpdate } from '../OrganisationContext'


function SignIn() {

  const setOrganisation = useOrganisationUpdate();
  const navigate = useNavigate();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleChange = e => {
    if(e.target.id === 'username-input'){
      setUsername(e.target.value);
      signInInputFilled('username');
    } else if(e.target.id === 'password-input') {
      setPassword(e.target.value);
      signInInputFilled('password');
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(!username){
      signInInputBlank('username');
    } else if(!password) {
      signInInputBlank('password');
    } else {
      e.preventDefault();
      getUserByUsername(username).then((user) => {
        signInWithEmailAndPassword(auth, user.email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const firestoreUser = getUserByUID(user.uid);
          firestoreUser.then((res) => {
            if(res.userType === 'orgRep'){
              const orgDocID = res.orgDocID;
              const org = getOrgByDocID(orgDocID);
              org.then((res) => {
                setOrganisation({
                  orgName : res.orgName,
                  orgDocID : orgDocID
                })
                navigate('/OrgRepHome', {
                  replace : true
                });
              })
            } else if(res.userType === 'covidManAdmin') {
              navigate(`/ManageOrg`, {replace : true})
            } else {
              invalidSignIn('username');
            }
          })
        })
        .catch((error) => {
          const code = error.code;
          if(code.indexOf('password') != -1){
            invalidSignIn('password');
          } else {
            console.log(code)
            invalidSignIn('username')
          }
        })
      })
    }
  }

  const invalidSignIn = (input) => {
    const tooltip = document.querySelector(`#${input}-tooltip2`);
    const formControl = document.querySelector(`#${input}-input`);
    formControl.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
      border: 1px solid #E66D7A;
    `;
    formControl.value = '';
    formControl.focus();
    tooltip.style.display = 'block';
    tooltip.style.animation = 'fadeOut 0.4s 3.65s ease-out';
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 4000);
    if(input === 'username') {
      const tooltip = document.querySelector(`#password-tooltip2`);
      const formControl = document.querySelector(`#password-input`);
      formControl.style = `
        box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
        border: 1px solid #E66D7A;
      `;
      formControl.value = '';
      tooltip.style.display = 'block';
      tooltip.style.animation = 'fadeOut 0.4s 3.65s ease-out';
      setTimeout(() => {
        tooltip.style.display = 'none';
      }, 4000);
    }
  }

  const signInInputFilled = (input) => {
    const tooltip = document.querySelector(`#${input}-tooltip`);
    const formControl = document.querySelector(`#${input}-input`);
    formControl.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #C5E1D4;
      border: 1px solid #85BFA4;
      animation : inputBoxGreenFadeout 0.4s 3.65s ease-out;
    `;
    setTimeout(() => {
      formControl.style = `
        box-shadow: none;
        border: 1px solid #ced4da;
      `;
    }, 4000);
    tooltip.style.display = 'none';
  }

  const signInInputBlank = (input) => {
    const tooltip = document.querySelector(`#${input}-tooltip`);
    const formControl = document.querySelector(`#${input}-input`);
    formControl.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
      border: 1px solid #E66D7A;
    `;
    tooltip.style.display = 'block';
    formControl.focus();
  }

  return (
    <div className='sign-in'>
      <div className='sign-inWrapper fade-in-sign-in'>
        <h2 className='title'>Sign In</h2>
        <Form 
          noValidate 
          onSubmit={handleSubmit}>
          <div className='fade-in-left sign-inFormInputs'>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser}/>
              </InputGroup.Text>
              <Form.Floating>
                <Form.Control
                  id="username-input"
                  placeholder='Username'
                  type='text'
                  required
                  onChange={handleChange}
                  autoComplete='off'
                  />
                <label className='input-label'>Username</label>
              </Form.Floating>
              <Form.Control.Feedback 
                type='invalid' 
                tooltip
                id='username-tooltip'>
                Please fill in the username
              </Form.Control.Feedback>
              <Form.Control.Feedback
                type='invalid'
                tooltip
                id='username-tooltip2'
                >
                Invalid username
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup hasValidation>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faKey}/>
            </InputGroup.Text>
            <Form.Floating>
              <Form.Control
                id="password-input"
                placeholder='Password'
                type='password'
                onChange={handleChange}
                autoComplete='off'
              />
              <label className='input-label'>Password</label>
            </Form.Floating>
            <Form.Control.Feedback 
              type='invalid' 
              tooltip
              id='password-tooltip'>
              Please fill in the password
            </Form.Control.Feedback>
            <Form.Control.Feedback
              type='invalid'
              tooltip
              id='password-tooltip2'
              >
              Invalid password
            </Form.Control.Feedback>
            </InputGroup>
          </div>
          <Button 
            type='submit'
            className='sign-inSubmitBtn'
            variant='primary'>
              Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn