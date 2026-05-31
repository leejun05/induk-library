import React, { useState, useContext } from 'react';
import { SeatContext } from '../context/SeatContext'; 
import SeatDetail from './SeatDetail'; 

// @ts-ignore
import '../App.css'; // 👈 바로 윗줄에 // @ts-ignore 를 적어주면 타입스크립트 에러가 마법처럼 사라집니다!

const SeatReservation: React.FC = () => {
  const seatContextValue = useContext(SeatContext);
  
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  if (!seatContextValue) {
    console.error("SeatReservation 컴포넌트는 반드시 SeatProvider 내부에서 사용되어야 합니다.");
    return <div style={{ textAlign: 'center', padding: '50px' }}>도서관 데이터를 불러오는 중...</div>;
  }

  const { seats, availableSeatsCount, totalSeatsCount } = seatContextValue;
  
  const handleSeatClick = (id: number) => {
    setSelectedSeatId(id);
    setShowModal(true); 
  };

  // 🗺️ 정돈된 15석 입체형 공간 좌석 좌표 마스터 맵
  const seatPositions: { [key: number]: { x: number; y: number } } = {
    // 🪟 왼쪽 A구역 (창가 개인 몰입 존)
    1: { x: 40, y: 30 }, 2: { x: 40, y: 110 }, 3: { x: 40, y: 190 }, 4: { x: 40, y: 270 }, 5: { x: 40, y: 350 },
    // 💻 오른쪽 B구역 (팀 워크 테이블 존 4인석)
    6: { x: 180, y: 240 }, 7: { x: 245, y: 240 }, 8: { x: 180, y: 305 }, 9: { x: 245, y: 305 }, 
    // 🖥️ 오른쪽 B구역 (멀티미디어 테이블 존 4인석)
    10: { x: 350, y: 240 }, 11: { x: 415, y: 240 }, 12: { x: 350, y: 305 }, 13: { x: 415, y: 305 }, 
    // ☕ 오른쪽 B구역 (외곽 라운지 독립형 2인석)
    14: { x: 500, y: 240 }, 15: { x: 500, y: 305 },
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={centerContainerStyle}>
        
        {/* 아늑한 베이지 & 웜 옐로우 그라데이션 배너 */}
        <div style={heroBannerStyle}>
          <h2 style={mainTitleStyle}>🖥️ 인덕대학교 스마트 좌석 예약 시스템</h2>
          <p style={subTitleStyle}>원하시는 자리를 선택하여 실시간으로 예약 및 반납을 진행해 주세요.</p>
          
          <div style={badgeContainerStyle}>
            <span style={badgeStyle}>
              🟢 예약 가능 <strong style={{ color: '#d97706', marginLeft: '5px' }}>{availableSeatsCount}석</strong>
            </span>
            <span style={badgeStyle}>
              🔴 이용 중 <strong style={{ color: '#78350f', marginLeft: '5px' }}>{totalSeatsCount - availableSeatsCount}석</strong>
            </span>
          </div>
        </div>

        {/* 🏛️ 프리미엄 글래스모피즘 판넬 */}
        <div style={kioskPanelStyle}>
          
          {/* 📷 대형 도서관 전경 이미지 영역 */}
          <div style={imageWrapperStyle}>
            <img 
              src="/library.jpg" 
              alt="도서관 전경" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* 좌석 배치 마스터 맵 */}
          <div style={{ position: 'relative', width: '580px', height: '440px', margin: '0 auto' }}>
            
            {/* 구역 텍스트 라벨 */}
            <div style={{ position: 'absolute', left: '30px', top: '2px', fontSize: '12px', fontWeight: 'bold', color: '#c5bcaf', letterSpacing: '0.5px' }}>WINDOW ZONE (A)</div>
            <div style={{ position: 'absolute', left: '180px', top: '215px', fontSize: '12px', fontWeight: 'bold', color: '#c5bcaf', letterSpacing: '0.5px' }}>TEAM LAB TABLE (B)</div>
            <div style={{ position: 'absolute', left: '500px', top: '215px', fontSize: '12px', fontWeight: 'bold', color: '#c5bcaf', letterSpacing: '0.5px' }}>LOUNGE</div>

            {seats.map((seat) => {
              const pos = seatPositions[seat.id] || { x: 0, y: 0 };
              
              // 5초마다 줄어드는 영역 계산
              const visualTime = Math.ceil(seat.remainingTime / 5) * 5;
              const progressPercent = seat.reserved ? (visualTime / 60) * 100 : 0;

              return (
                <button
                  key={seat.id}
                  className={`seat-button ${seat.reserved ? 'seat-reserved' : 'seat-available'}`}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                    width: 58,   
                    height: 55,
                    background: seat.reserved 
                      ? 'linear-gradient(135deg, #5c4433 0%, #3d2d21 100%)' 
                      : 'linear-gradient(135deg, #e3ba8f 0%, #c4976c 100%)',
                    color: seat.reserved ? '#ffffff' : '#4a3319', 
                    fontWeight: 'bold',
                    fontSize: '13px',
                    border: '1px solid rgba(139, 92, 26, 0.25)',
                    borderRadius: 12, 
                    cursor: 'pointer',
                    overflow: 'hidden', 
                    padding: 0,
                    boxShadow: '0 4px 8px rgba(139, 92, 26, 0.1)',
                  }}
                  onClick={() => handleSeatClick(seat.id)}
                >
                  {/* 🔴 이용 중일 때 내부에서 스르륵 차오르는 레드 타이머 바 */}
                  {seat.reserved && (
                    <div style={{
                      position: 'absolute',
                      left: 0, top: 0, bottom: 0,
                      width: `${progressPercent}%`,
                      background: 'linear-gradient(135deg, #ff4d4d 0%, #cc0000 100%)', 
                      transition: 'width 0.5s ease-out', 
                      zIndex: 1,
                    }} />
                  )}

                  {/* 글자 레이어 */}
                  <span style={{ position: 'relative', zIndex: 2, display: 'block', textShadow: seat.reserved ? '1px 1px 2px rgba(0,0,0,0.4)' : 'none' }}>
                    {seat.seatNumber}
                    {seat.reserved && (
                      <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '1px', opacity: 0.9 }}>
                        {seat.remainingTime}s
                      </div>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

        </div> {/* kioskPanelStyle 끝 */}

      </div>
      
      {/* 팝업창 모달 작동 조건 */}
      {showModal && selectedSeatId !== null && (
        <SeatDetail seatIdNum={selectedSeatId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

// --- 🎨 스타일시트 (오타 수정 완료) ---
const pageWrapperStyle: React.CSSProperties = { width: '100%', minHeight: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 20px', boxSizing: 'border-box' };
const centerContainerStyle: React.CSSProperties = { width: '100%', maxWidth: '850px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' };
const heroBannerStyle: React.CSSProperties = { width: '100%', background: 'linear-gradient(135deg, #fef3c7 0%, #fde047 100%)', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#452b09', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.12)', boxSizing: 'border-box' };
const mainTitleStyle: React.CSSProperties = { fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' };
const subTitleStyle: React.CSSProperties = { fontSize: '13px', margin: '0 0 16px 0', opacity: 0.8 };

/* 🛠️ 오타 교정 완료: justifyCOntent ➔ justifyContent */
const badgeContainerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', gap: '12px' };

const badgeStyle: React.CSSProperties = { backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '600', backdropFilter: 'blur(5px)', border: '1px solid rgba(245, 158, 11, 0.2)' };
const kioskPanelStyle: React.CSSProperties = { width: '100%', backgroundColor: '#ffffff', border: '1px solid #eaddca', borderRadius: '16px', padding: '40px 20px', boxShadow: '0 8px 32px rgba(139, 92, 26, 0.04)', boxSizing: 'border-box' };

/* 🛠️ 오타 교정 완료: justifyCOntent ➔ justifyContent */
const imageWrapperStyle: React.CSSProperties = { width: '500px', height: '260px', margin: '0 auto 35px auto', border: '1px solid rgba(139, 92, 26, 0.1)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fbfaf7', borderRadius: '14px', boxShadow: '0 6px 20px rgba(139, 92, 26, 0.05)' };

export default SeatReservation;