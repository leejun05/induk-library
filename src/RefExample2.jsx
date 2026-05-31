import React, {useRef} from "react";

export default function RefExample2() {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} placeholder="여기에 입력"/>
            <button onClick={focusInput}>포커스 이동</button>
        </div>
    );
}