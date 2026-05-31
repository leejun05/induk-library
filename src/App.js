import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { SeatProvider } from './context/SeatContext'; // 1. SeatProvider 임포트 추가!

import Header from './Library/Header';
import Home from './Library/Home';
import SeatReservation from './Library/SeatReservation';
import Login from './Library/Login';
import ErrorPage from './Library/ErrorPage';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      {/* 2. 전역에서 좌석 데이터를 쏠 수 있도록 SeatProvider로 감싸줍니다 */}
      <SeatProvider> 
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* 3. 예시 화면처럼 로그인을 안 해도 좌석판은 보여야 하므로 PrivateRoute를 제거합니다 */}
            <Route path="/seat" element={<SeatReservation />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </SeatProvider>
    </AuthProvider>
  );
};

export default App;