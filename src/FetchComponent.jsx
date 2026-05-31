import React, { useState, useEffect, useCallback } from "react";

export default function FetchComponent() {
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState("");

    //API 호출 함수 - useCallback으로 메모이제이션
    const fetchData = useCallback(() => {
        console.log("데이터 불러오는중...");
        setTimeout(() => {
            setData(`"${keyword}"에 대한 검색 결과`);
        }, 1000);
    }, [keyword]);

    //keyword 변경 시 자동 호출
    useEffect(() => {
        console.log("useEffect()");
        if (keyword) fetchData();
    }, [fetchData]);

    return (
        <div>
            <h2>검색 예제 (단일 컴포넌트)</h2>
            <input
                type="text"
                placeholder="검색어 입력"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <p>결과: {data}</p>
            <button onClick={fetchData}>수동 검색</button>
        </div>
    );
}