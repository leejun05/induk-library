import React, { useState, useMemo } from 'react';

function BigSquare() {
    const [number, setNumber] = useState(0); //제곱 계산 입력값
    const [count, setCount] = useState(0); //"+1"버튼 클릭시 증가값

    //느리게 계산되는 제곱 함수 (예제용으로 일부러 지연)
    const slowSquare = (num) => {
        console.log('계산 중...');
        let result = 0;
        for (let i = 0; i<2500000000; i++) {
            result = num * num;
        }
        return result;
    };

    //useMemo로 계산 결과를 메모이제이션
    const squared = useMemo(() => slowSquare(number), [number]);

    return (
        <div>
            <h2>느린 제곱 계산기</h2>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            <p>제곱 결과: {squared}</p>
            <p>{count}</p>
            <button onClick={() => setCount(count+1)}>+1</button>
        </div>
    );
}

export default BigSquare;