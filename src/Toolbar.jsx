import React from "react";

export default function Toolbar(props) {
    const { isloggedIn, onClickLogin, onClickLogout } = props;

    return (
        <div style={{ margin: 10 }}>
            {isloggedIn ? 
                <button onClick={onClickLogout}>로그아웃</button>
                : 
                <button onClick={onClickLogin}>로그인</button>
            }
            {isloggedIn && <span> 환영합니다! </span>}
        </div>
    );
}