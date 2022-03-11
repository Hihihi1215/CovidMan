import React from 'react'
import { useLocation } from 'react-router-dom'

function RecordAidDisbursement() {

    const location = useLocation();
    const appealDocIDState = location.state;
    const appealDocID = appealDocIDState.appealDocID;

  return (
    <div className='record-aidDisbursementWrapper'>
        {appealDocID}
    </div>
  )
}

export default RecordAidDisbursement