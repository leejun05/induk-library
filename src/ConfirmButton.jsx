import React, {useState} from 'react';

function ConfirmButton() {
    const [isConfirmed ,setConfirmed] = useState(false);
    
    const handleConfirm = () => {
        setConfirmed(prevIsConfirmed => !prevIsConfirmed);
    }
    
    return (
        <button onClick={ handleConfirm } disabled={ isConfirmed }>
            {isConfirmed ? "확인됨" : "확인하기" }
        </button>
    );
}
export default ConfirmButton;
