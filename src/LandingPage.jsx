import React, { useState } from "react";
import Toolbar from "./Toolbar";

export default function LandingPage(props) {
    const [isloggedIn, setIsLoggedIn] = useState(false);

    const onClickLogin = () => {
        setIsLoggedIn(true);
    };
    const onClickLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div style={{ padding: 10 }}>
            <Toolbar
                isloggedIn={isloggedIn}
                onClickLogin={onClickLogin}
                onClickLogout={onClickLogout}
            />
            <hr />
            로그인해주세요!
        </div>
    );
}