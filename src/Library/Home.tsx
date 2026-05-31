import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeatContext } from '../context/SeatContext'; 

const Home: React.FC = () => {
  const seatContextValue = useContext(SeatContext);
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(0);
  
  // 🔒 무한 루프 방지를 위한 안전핀 (이미 애니메이션이 끝났는지 기억하는 역할)
  const isAnimated = useRef(false);

  const availableSeatsCount = seatContextValue ? seatContextValue.availableSeatsCount : 0;
  const totalSeatsCount = seatContextValue ? seatContextValue.totalSeatsCount : 15;

  // 🔢 무한 반복 버그를 잡은 카운팅 애니메이션 훅
  useEffect(() => {
    if (!seatContextValue) return;
    
    const end = availableSeatsCount;

    // 만약 값이 0이거나 이미 애니메이션이 한 번 완료되었다면 숫자를 고정하고 탈출!
    if (end === 0 || isAnimated.current) {
      setDisplayCount(end);
      return;
    }

    let start = 0;
    const duration = 1000; // 1초 동안 실행
    const stepTime = Math.max(Math.floor(duration / end), 30); 

    const timer = setInterval(() => {
      start += 1;
      
      if (start >= end) {
        setDisplayCount(end);
        isAnimated.current = true; // 🎉 "애니메이션 끝났음"이라고 도장을 쾅 찍어줍니다.
        clearInterval(timer);
      } else {
        setDisplayCount(start);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [availableSeatsCount, seatContextValue]); // 의존성이 요동쳐도 useRef 도장 덕분에 멈춥니다.

  if (!seatContextValue) {
    console.error("Home 컴포넌트는 반드시 SeatProvider 내부에서 사용되어야 합니다.");
    return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;
  }

  const usagePercentage = totalSeatsCount > 0 ? (availableSeatsCount / totalSeatsCount) * 100 : 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (usagePercentage / 100) * circumference;

  return (
    <div style={containerStyle}>
      {/* 👋 웰컴 배너 섹션 */}
      <section style={bannerStyle}>
        <h1 style={titleStyle}>인덕대학교 도서관</h1>
        <p style={subtitleStyle}>안녕하세요! 실시간 좌석 확인 및 예약이 가능한 스마트 도서관 시스템입니다.</p>
      </section>

      {/* 📊 실시간 대시보드 그리드 영역 */}
      <div style={gridStyle}>
        
        {/* 1번 카드: 그라데이션 원형 애니메이션 게이지 */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>📊 실시간 좌석 열람율</h3>
          <div style={gaugeContainerStyle}>
            
            <svg width="140" height="140" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="chartGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#2575fc', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#6a11cb', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r={radius} stroke="#e6e6e6" strokeWidth="10" fill="transparent" />
              <circle 
                cx="60" cy="60" r={radius} 
                stroke="url(#chartGrad)" strokeWidth="10" fill="transparent" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)" 
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            
            <div style={gaugeTextStyle}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2575fc' }}>
                {displayCount}
              </span>
              <span style={{ fontSize: '14px', color: '#888' }}> / {totalSeatsCount}석</span>
            </div>
          </div>
          <p style={cardDescStyle}>현재 즉시 이용 가능한 빈 좌석 수입니다.</p>
          <button onClick={() => navigate('/seat')} style={actionButtonStyle}>
            좌석 예약하러 가기 ➔
          </button>
        </div>

        {/* 2번 카드: 공지사항 */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>📢 도서관 주요 공지</h3>
          <ul style={noticeListStyle}>
            <li style={noticeItemStyle}>
              <span style={noticeTagStyle}>필독</span>
              <span style={noticeTextStyle}>2026년도 기말고사 기간 24시간 열람실 개방 안내</span>
            </li>
            <li style={noticeItemStyle}>
              <span style={noticeTagNormalStyle}>안내</span>
              <span style={noticeTextStyle}>도서관 내부 쾌적한 환경 조성을 위한 음식물 반입 금지</span>
            </li>
            <li style={noticeItemStyle}>
              <span style={noticeTagNormalStyle}>점검</span>
              <span style={noticeTextStyle}>좌석 예약 시스템 서버 안정화 작업 (02:00 ~ 04:00)</span>
            </li>
          </ul>
          <p style={cardDescStyle}>쾌적한 도서관 이용을 위해 공지를 확인해 주세요.</p>
        </div>

      </div>
    </div>
  );
};

// --- 🎨 스타일시트 (기존 유지) ---
const containerStyle: React.CSSProperties = { maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: "sans-serif" };
const bannerStyle: React.CSSProperties = { textAlign: 'center', marginBottom: '40px' };
const titleStyle: React.CSSProperties = { fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px' };
const subtitleStyle: React.CSSProperties = { fontSize: '1.1rem', color: '#666666', lineHeight: '1.6' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '20px' };
const cardStyle: React.CSSProperties = { backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid #e1e4e6', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
const cardTitleStyle: React.CSSProperties = { fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0' };
const cardDescStyle: React.CSSProperties = { fontSize: '13px', color: '#888', textAlign: 'center', margin: '15px 0 0 0' };
const gaugeContainerStyle: React.CSSProperties = { position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' };
const gaugeTextStyle: React.CSSProperties = { position: 'absolute', textAlign: 'center' };
const actionButtonStyle: React.CSSProperties = { marginTop: '20px', backgroundColor: '#2575fc', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' };
const noticeListStyle: React.CSSProperties = { listStyle: 'none', padding: 0, margin: 0 };
const noticeItemStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f3f5', gap: '10px' };
const noticeTagStyle: React.CSSProperties = { backgroundColor: '#ffe3e3', color: '#e03131', fontSize: '11px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '4px', whiteSpace: 'nowrap' };
const noticeTagNormalStyle: React.CSSProperties = { backgroundColor: '#e7f5ff', color: '#1c7ed6', fontSize: '11px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '4px', whiteSpace: 'nowrap' };
const noticeTextStyle: React.CSSProperties = { fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

export default Home;