import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const fixedID = 'admin';
const fixedPW = '1234';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === fixedID && pw === fixedPW) {
      login(id);
      navigate('/seat'); // 로그인 성공 후 좌석 예약 페이지 이동
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>로그인</h2>
      <div>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          style={{ marginBottom: 10, width: '100%', padding: 8 }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          style={{ marginBottom: 10, width: '100%', padding: 8 }}
        />
      </div>
      <button type="submit" style={{ padding: '8px 16px' }}>로그인</button>
    </form>
  );
};

export default Login;