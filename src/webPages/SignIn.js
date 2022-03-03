import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import '../css/SignIn.css'
import { auth, getOrgByDocID, getUserByUID } from '../firebase'

function SignIn() {

  const navigate = useNavigate();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleChange = e => {
    if(e.target.id === 'username-input'){
      setUsername(e.target.value);
    } else if(e.target.id === 'password-input') {
      setPassword(e.target.value);
    }
    if(username) {
      usernameFilled();
    }
    if(password) {
      passwordFilled();
    }
  }

  const handleSubmit = e => {
    if(!username && !password) {
      e.preventDefault();
      const usernameInput = usernameBlank();
      passwordBlank();
      usernameInput.focus();
    } else if(!username){
      e.preventDefault();
      const usernameInput = usernameBlank();
      usernameInput.focus();
    } else if(!password) {
      e.preventDefault();
      const passwordInput = passwordBlank();
      passwordInput.focus();
    } else {
      e.preventDefault();
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const firestoreUser = getUserByUID(user.uid);
          firestoreUser.then((res) => {
            if(res.userType === 'orgRep'){
              const orgDocID = res.orgDocID;
              const org = getOrgByDocID(orgDocID);
              org.then((res) => {
                navigate('/RegisterApp', {
                  state : { orgName : res.orgName, orgDocID : orgDocID }
                });
              })
            } else {
              invalidUsername();
            }
          })
        })
        .catch((error) => {
          const code = error.code;
          if(code.indexOf('email') != -1){
            invalidUsername();
          } else {
            invalidPassword();
          }
        })
    }
  }

  const invalidPassword = () => {
    const passwordTooltip2 = document.querySelector('#password-tooltip2');
    const passwordInput = document.querySelector('#password-input');
    passwordInput.value = '';
    passwordInput.focus();
    passwordTooltip2.style.display = 'block';
    passwordTooltip2.style.animation = 'fadeOut 0.4s 3.65s ease-out';
    setTimeout(() => {
      passwordTooltip2.style.display = 'none';
    }, 4000);
  }

  const invalidUsername = () => {
    const usernameTooltip2 = document.querySelector('#username-tooltip2');
    const usernameInput = document.querySelector('#username-input');
    usernameInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
      border: 1px solid #E66D7A;
    `;
    usernameInput.value = '';
    usernameInput.focus();
    usernameTooltip2.style.display = 'block';
    usernameTooltip2.style.animation = 'fadeOut 0.4s 3.65s ease-out';
    setTimeout(() => {
      usernameTooltip2.style.display = 'none';
    }, 4000);
  }

  const passwordFilled = () => {
    const passwordTooltip = document.querySelector('#password-tooltip');
    const passwordInput = document.querySelector('#password-input');
    passwordInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #C5E1D4;
      border: 1px solid #85BFA4;
      animation : inputBoxGreenFadeout 0.4s 3.65s ease-out;
    `;
    setTimeout(() => {
      passwordInput.style = `
        box-shadow: none;
        border: 1px solid #ced4da;
      `;
    }, 4000);
    passwordTooltip.style.display = 'none';
  }

  const usernameFilled = () => {
    const usernameTooltip = document.querySelector('#username-tooltip');
    const usernameInput = document.querySelector('#username-input');
    usernameInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #C5E1D4;
      border: 1px solid #85BFA4;
      animation : inputBoxGreenFadeout 0.4s 3.65s ease-out;
    `;
    setTimeout(() => {
      usernameInput.style = `
        box-shadow: none;
        border: 1px solid #ced4da;
      `;
    }, 4000);
    usernameTooltip.style.display = 'none';
  }

  const passwordBlank = () => {
    const passwordTooltip = document.querySelector('#password-tooltip');
    const passwordInput = document.querySelector('#password-input');
    passwordInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
      border: 1px solid #E66D7A;
    `;
    passwordTooltip.style.display = 'block';
    return passwordInput;
  }

  const usernameBlank = () =>{
    const usernameTooltip = document.querySelector('#username-tooltip');
    const usernameInput = document.querySelector('#username-input');
    usernameInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #F6CCD0;
      border: 1px solid #E66D7A;
    `;
    usernameTooltip.style.display = 'block';
    return usernameInput;
  }

  return (
    <div className='sign-in'>
      <div className='sign-inWrapper'>
        <h2 className='title'>Sign In</h2>
        <Form 
          noValidate 
          onSubmit={handleSubmit}>
          <div className='fade-in sign-inFormInputs'>
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
            variant='primary'>
              Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn