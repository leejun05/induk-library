import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🌓 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크 모드 변경 시 화면 전체 배경색 토글
  // Header.jsx 내의 useEffect를 이렇게 교체해 줍니다.
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
      // 👇 다크모드 카드 배경색 변수 설정
      document.documentElement.style.setProperty('--card-bg', '#1e1e1e'); 
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
      // 👇 라이트모드 카드 배경색 변수 설정
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
    }
  }, [isDarkMode]);

  // 🔒 로그아웃 더블 체크 및 알림 로직
  const handleLogoutClick = () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirm) {
      logout(); 
      alert("성공적으로 로그아웃 되었습니다.");
      navigate('/'); 
    }
  };

  // 🎨 스타일 결합을 위한 인라인 조건문 처리
  const currentHeaderStyle = isDarkMode ? styles.darkHeader : styles.lightHeader;
  const currentNavButtonStyle = isDarkMode ? styles.darkNavButton : styles.lightNavButton;
  const currentLoginButtonStyle = isDarkMode ? styles.darkLoginButton : styles.lightLoginButton;
  const currentLogoutButtonStyle = isDarkMode ? styles.darkLogoutButton : styles.lightLogoutButton;
  const currentToggleStyle = isDarkMode ? styles.darkToggle : styles.lightToggle;

  return (
    <header style={{ ...styles.headerCommon, ...currentHeaderStyle }}>
      <div style={styles.container}>
        
        {/* 🏫 좌측 타이틀 로고 */}
        <div style={styles.logo} onClick={() => navigate('/')}>
          <span style={{ color: '#2575fc', marginRight: '4px' }}>인덕대</span> 
          <span style={{ color: isDarkMode ? '#fff' : '#333' }}>도서관</span>
        </div>

        {/* 🧭 우측 네비게이션 버튼 & 토글 메뉴 */}
        <nav style={styles.nav}>
          <Link to="/" style={currentNavButtonStyle}>Home</Link>
          <Link to="/seat" style={currentNavButtonStyle}>좌석 예약</Link>
          
          {user ? (
            <button onClick={handleLogoutClick} style={currentLogoutButtonStyle}>
              로그아웃 ({user.id})
            </button>
          ) : (
            <Link to="/login" style={currentLoginButtonStyle}>로그인</Link>
          )}

          {/* 🌓 다크 모드 전환 스위치 버튼 */}
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={currentToggleStyle}>
            {isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
          </button>
        </nav>
      </div>
    </header>
  );
};

// --- ✨ 자바스크립트 전용 객체 형태의 모던 UI 스타일북 ---
const styles = {
  headerCommon: {
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    fontFamily: "sans-serif",
  },
  container: {
    maxWidth: '1200px',
    height: '65px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    letterSpacing: '-0.5px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  // ☀️ 라이트 모드 상세 개별 스타일
  lightHeader: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  lightNavButton: {
    textDecoration: 'none',
    color: '#333333',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #dcdcdc',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  lightLoginButton: {
    textDecoration: 'none',
    backgroundColor: '#2575fc',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    padding: '8px 20px',
    borderRadius: '6px',
    border: '1px solid #2575fc',
    cursor: 'pointer',
  },
  lightLogoutButton: {
    backgroundColor: '#ffffff',
    color: '#d32f2f',
    border: '1px solid #d32f2f',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  lightToggle: {
    backgroundColor: '#f1f3f5',
    color: '#333',
    border: '1px solid #ced4da',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '8px 14px',
    borderRadius: '30px',
    cursor: 'pointer',
  },

  // 🌙 다크 모드 상세 개별 스타일
  darkHeader: {
    backgroundColor: '#1e1e1e',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
    borderBottom: '1px solid #333',
  },
  darkNavButton: {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #444444',
    backgroundColor: '#2a2a2a',
    cursor: 'pointer',
  },
  darkLoginButton: {
    textDecoration: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    padding: '8px 20px',
    borderRadius: '6px',
    border: '1px solid #3b82f6',
    cursor: 'pointer',
  },
  darkLogoutButton: {
    backgroundColor: '#2a2a2a',
    color: '#ff6b6b',
    border: '1px solid #ff6b6b',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  darkToggle: {
    backgroundColor: '#333333',
    color: '#fff',
    border: '1px solid #555555',
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '8px 14px',
    borderRadius: '30px',
    cursor: 'pointer',
  },
};

// 💡 중요: 순수 JS 환경(App.js)에서도 이 컴포넌트를 명확히 인식하도록 기본 내보내기 선언
export default Header;