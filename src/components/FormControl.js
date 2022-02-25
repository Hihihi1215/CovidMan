import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import '../css/FormControl.css'

function FormControl(props) {

    const tooltipFormat = () => {
        if(props.input === 'id'){
            return ' in the format of XXXXXX-XX-XXXX';
        } else if(props.input === 'email'){
            return ' in the format of xxx@xxx.com';
        }
    }

    const inputFilled = () => {
        const tooltip = document.querySelector(`#${props.input}-tooltip`);
        const formControl = document.querySelector(`#${props.input}-input`);
        console.table(formControl);
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

    const handleChange = e => {
        props.setInput(e.target.value);
        inputFilled();
    }

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const typeOfInput = (input) => {
        if(input === 'income'){
            return 'number';
        } else if(input === 'email') {
            return 'email';
        } else {
            return 'text'
        }
    }

  return (
    <InputGroup hasValidation>
        <InputGroup.Text>
            <FontAwesomeIcon icon={props.icon}/>
        </InputGroup.Text>
        <Form.Floating>
            <Form.Control
                id={`${props.input}-input`}
                placeholder={`${capitalize(props.input)}`}
                type={
                    typeOfInput(props.input)
                }
                required
                autoComplete='off'
                as={props.as}
                row={props.as? 9 : 1}
                onChange={handleChange}
            />
            <label className='input-label'>{capitalize(props.input)}</label>
        </Form.Floating>
        <Form.Control.Feedback
            type='invalid' 
            tooltip
            id={`${props.input}-tooltip`}>
            Please fill in a valid {props.input} {
                tooltipFormat()
            }
        </Form.Control.Feedback>
        <Form.Control.Feedback
            type='invalid'
            tooltip
            id={`${props.input}-tooltip2`}
            >
            Invalid username
        </Form.Control.Feedback>
    </InputGroup>
  )
}

export default FormControl