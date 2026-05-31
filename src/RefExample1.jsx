import React, {useState,useRef} from "react";

export default function RefExample1() {
    const [count,setCount] = useState(0);
    const refCount = useRef(0);

    console.log("렌더링");

    const increaseRef = () => {
        refCount.current += 1;
        console.log("ref 값:",refCount.current);
    };

    return(
        <div>
            <h2>useState: {count}</h2>
            <h2>useRef: {refCount.current}</h2>
            <button onClick={() => setCount(count + 1)}></button>
            <button onClick={increaseRef}></button>
        </div>
    )
}