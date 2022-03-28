import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';

function RecordContributionFormControl(props) {

    const tooltipFormat = () => {
        if(props.input === 'estimatedValue' || props.input === 'amount') {
            return ' that is more than 0'
        } else if(props.input === 'amount') {
            return ' that is more than 0'
        }
    }

    const inputFilled = e => {
        let tooltip = 'hi';
        props.setInput(e.target.value);
        tooltip = document.querySelector(`#${props.input}-tooltip`);
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
        if(input === 'amount' || input === 'estimatedValue') {
            return 'number';
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
    </InputGroup>
  )
}

export default RecordContributionFormControl