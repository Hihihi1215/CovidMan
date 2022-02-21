import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import '../css/SignIn.css'

function SignIn() {
  return (
    <div className='sign-in'>
      <div className='sign-inWrapper'>
        <h2 className='title'>Sign In</h2>
        <Form>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faUser}/>
            </InputGroup.Text>
            <Form.Floating>
              <Form.Control
                id="username-input"
                placeholder='Username'
              />
              <label className='input-label'>Username</label>
            </Form.Floating>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faKey}/>
            </InputGroup.Text>
            <Form.Floating>
              <Form.Control
                id="username-password"
                placeholder='Password'
              />
              <label className='input-label'>Password</label>
            </Form.Floating>
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