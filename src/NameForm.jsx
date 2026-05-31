import React, {useState} from "react";

export default function NameForm(props) {

    const [name, setName] = useState("");
    const [gender,setGender] = useState("남자");
    const [email, setEmail] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }

    const handleSubmit = (event) => {
        alert(`이름: ${name}, 성별: ${gender}`);
        event.preventDefault();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label>
                이름:
                <input type="text" value={name}
                    onChange={ handleChangeName } />
                </label>
                <br />
                <label>
                    성별:
                    <select value={gender}
                        onChange={ handleChangeGender }>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                    </select>
                </label>
                <label>
                    이메일:
                    <input type="email" value={email} 
                        onChange={ handleEmailChange } />
                </label>
                <button type="submit">제출</button>
            </form>
        );
}
