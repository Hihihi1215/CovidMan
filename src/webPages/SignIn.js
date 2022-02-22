import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../css/SignIn.css'

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
      navigate('/');
    }
  }

  const passwordFilled = () => {
    const passwordTooltip = document.querySelector('#password-tooltip');
    const passwordInput = document.querySelector('#password-input');
    passwordInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #C5E1D4;
      border: 1px solid #85BFA4;
    `;
    passwordTooltip.style.display = 'none';
  }

  const usernameFilled = () => {
    const usernameTooltip = document.querySelector('#username-tooltip');
    const usernameInput = document.querySelector('#username-input');
    usernameInput.style = `
      box-shadow: 0.5px 0.5px 0.5px 4px #C5E1D4;
      border: 1px solid #85BFA4;
    `;
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
          <InputGroup hasValidation>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faUser}/>
            </InputGroup.Text>
            <Form.Floating>
              <Form.Control
                id="username-input"
                placeholder='Username'
                required
                onChange={handleChange}
                />
              <label className='input-label'>Username</label>
            </Form.Floating>
            <Form.Control.Feedback 
              type='invalid' 
              tooltip
              id='username-tooltip'>
              Please fill in the username
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
              />
              <label className='input-label'>Password</label>
            </Form.Floating>
            <Form.Control.Feedback 
              type='invalid' 
              tooltip
              id='password-tooltip'>
              Please fill in the password
            </Form.Control.Feedback>
          </InputGroup>
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