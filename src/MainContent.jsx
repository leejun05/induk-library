import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";

function MainContent(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [lang, setLang] = useState('ko'); // 언어 상태 추가

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                padding: '1.5rem',
                backgroundColor: theme === 'light' ? 'white' : 'black',
                color: theme === 'light' ? 'black' : 'white',
            }}
        >
            <p>테마 변경이 가능한 웹사이트입니다.</p>
            <button onClick={toggleTheme}>테마 변경</button>

            <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                style={{ marginLeft: '10px' }}
            >
                <option value="ko">한글</option>
                <option value="en">영어</option>
            </select>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                {lang === 'ko' ? '안녕하세요' : 'Hello'}
            </div>
        </div>
    );
}

export default MainContent;