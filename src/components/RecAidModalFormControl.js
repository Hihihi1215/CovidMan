import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import '../css/RecAidModalFormControl.css'

function RecAidModalFormControl(props) {

    const tooltipFormat = () => {
        if(props.input === 'disbursementDate'){
            return ' that is in the present';
        } else if(props.input === 'cash' || props.input === 'goodsValue'){
            return ` in the range of 1 - ${props.total}`;
        }
    }

    const inputFilled = e => {
        let tooltip = 'hi';
        props.setInput(e.target.value);
        if(props.duplicate){
            tooltip = document.querySelector(`#${props.input}-tooltip3`);
        } else {
            tooltip = document.querySelector(`#${props.input}-tooltip`);
        }
        tooltip.style.display = 'none';
        const formControl = document.querySelector(`#${props.input}-input`);
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
    }

    const handleChange = e => {
        inputFilled(e);
    }

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const typeOfInput = (input) => {
        if(input === 'cash' || input === 'goodsValue'){
            return 'number';
        } else if(input === 'disbursementDate') {
            return 'date';
        } else {
            return 'text'
        }
    }

  return (
    <InputGroup hasValidation className='rec-aidModalFormControl'>
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
            id={`${props.input}-tooltip3`}
            >
            There is an existing user with the same {props.duplicate}
        </Form.Control.Feedback>
    </InputGroup>
  )
}

export default RecAidModalFormControl