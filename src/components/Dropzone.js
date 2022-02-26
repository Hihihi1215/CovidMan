import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDropzone } from 'react-dropzone';
import '../css/Dropzone.css'
import pdfImage from '../img/pdf-image.png';

function Dropzone() {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: '.pdf'});
    const files = acceptedFiles.map(file => (
        <li key={file.path} className='uploaded-fileItem'>
            <img
                src={pdfImage}
                className='uploaded-fileImage'
            />
            <p>{file.path}</p>
        </li>
    ));

    return (
        <div className='dropzone-wrapper'>
            <div {...getRootProps({
                className: 'dropzone reg-appDropzone',
                multiple:true
            })}>
                <input {...getInputProps()} multiple accept='.pdf' required/>
                <FontAwesomeIcon icon={faCloudArrowUp} className='cloud-uploadIcon' />
                <p>Drag 'n' drop PDF files here <br></br>
                    <b>OR</b><br></br>
                    <span className='click-toSelect'>Click to select files</span></p>
            </div>
            <aside>
                <h6>Files</h6>
                <div className='uploaded-filesWrapper'>
                    <ul>{files}</ul>
                </div>
            </aside>
        </div>
    )
}

export default Dropzone