import React,{ useState } from "react";

//자식 컴포넌트 A: 2배 값 표시
function DoubleDisplay({ value }) {
    return (
        <div>
            <span>
                자식 A(x2) : {value * 2}
            </span>
        </div>
    );
}

//자식 컴포넌트 B: 3배 값 표시
function TripleDisplay({ value }) {
    return (
        <div>
            <span>
                자식 B(x3) : {value * 3}
            </span>
        </div>
    );
}

export default function SharedState() {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(Number(e.target.value));
    };

    return (
        <div>
            부모 컴포넌트
            <input
                type="number"
                value={value}
                onChange={handleChange}
            />
            <DoubleDisplay value={value}/>
            <TripleDisplay value={value}/>
        </div>
    );
}