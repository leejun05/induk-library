import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ padding: '0 20px' }}>
      <h2>접속할 수 없는 URL 입니다.</h2>
      <p>
        <Link to="/">Home으로 이동</Link>
      </p>
    </div>
  );
};

export default ErrorPage;