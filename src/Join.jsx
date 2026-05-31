import React, {useState} from 'react';

export default function Join() {
    //[필수]약관 체크 상태
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);

    //[선택] 광고 마케팅 체크 상태
    const [isMarketingAgreed, setIsMarKetingAgreed] = useState(false);

    //[필수]약간 동의 체크시 이벤트 헨들러
    const handleTermsChange = (event) => {
        setIsTermsAgreed(event.target.checked);
    };

    //[선택]광고 마케팅 체크시 이벤트 헨들러
    const handleMarketingChange = (event) => {
        setIsMarKetingAgreed(event.target.checked);
    };

    const handleSignup = () => {
        alert("가입이 완료되었습니다!");
    };

    return (
        <div>
            <h2>약관 동의</h2>
            <label>
                <input
                    type="checkbox"
                    checked={isTermsAgreed}
                    onChange={handleTermsChange}
                />
                [필수] 약관에 동의합니다.
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={isMarketingAgreed}
                    onChange={handleMarketingChange}
                />
                [선택] 광고 마케팅에 동의합니다.
            </label>
            <br />
            <button
                onClick={handleSignup}
                disabled={!isTermsAgreed}>
                가입
            </button>
        </div>
    );
}