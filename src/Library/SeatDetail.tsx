import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeatContext } from '../context/SeatContext';

interface SeatDetailProps {
  seatIdNum: number;
  onClose: () => void;
}

const SeatDetail: React.FC<SeatDetailProps> = ({ seatIdNum, onClose }) => {
  // 💡 Context 객체 통째로 가져오기
  const seatContextValue = useContext(SeatContext);
  const navigate = useNavigate();

  // 📝 입력 필드 상태 관리
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  // 🔍 [핵심 조치] Context가 undefined인지 안전하게 체크합니다.
  if (!seatContextValue) {
    console.error("SeatDetail 컴포넌트는 반드시 SeatProvider 내부에서 사용되어야 합니다.");
    return null; // 데이터가 없으면 안전하게 아무것도 렌더링하지 않고 탈출
  }

  // 데이터가 안전하게 존재함이 증명되었으므로, 안심하고 구조 분해 할당을 합니다!
  const { seats, reserveSeat, cancelReservation } = seatContextValue;

  // 현재 선택된 좌석 정보 찾기
  const currentSeat = seats.find((s) => s.id === seatIdNum);

  // 🚀 예약하기 버튼 클릭 시 실행되는 함수
  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId.trim() || !password.trim()) {
      alert("입력 정보가 올바르지 않습니다. 학번과 비밀번호를 모두 입력해 주세요.");
      onClose(); 
      navigate('/login'); 
      return;
    }

    if (currentSeat) {
      reserveSeat(currentSeat.id, studentId);
      alert(`${currentSeat.seatNumber}번 좌석 예약이 완료되었습니다!`);
      onClose();
    }
  };

  // 🛑 예약 취소(반납) 버튼 클릭 시 실행되는 함수
  const handleCancelClick = () => {
    if (currentSeat) {
      const isConfirm = window.confirm(`${currentSeat.seatNumber}번 좌석 예약을 취소(반납)하시겠습니까?`);
      if (isConfirm) {
        cancelReservation(currentSeat.id);
        alert(`${currentSeat.seatNumber}번 좌석이 정상적으로 반납되었습니다.`);
        onClose();
      }
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalBoxStyle}>
        {/* 닫기 버튼 */}
        <button onClick={onClose} style={closeButtonStyle}>X</button>
        
        <h3 style={modalTitleStyle}>
          좌석 {currentSeat?.reserved ? '정보' : '예약'} - {currentSeat?.seatNumber}
        </h3>
        
        {/* 좌석이 이미 예약된 상태라면 취소 화면 노출 */}
        {currentSeat?.reserved ? (
          <div style={infoContainerStyle}>
            <div style={statusBadgeStyle}>현재 이용 중인 좌석</div>
            <p style={timeInfoStyle}>
              남은 시간: <span style={{ color: '#2575fc', fontWeight: 'bold' }}>{currentSeat.remainingTime}초</span>
            </p>
            <p style={userInfoStyle}>예약자 ID: {currentSeat.userId || '학생'}</p>
            
            <button onClick={handleCancelClick} style={cancelButtonStyle}>
              예약 취소 (좌석 반납)
            </button>
          </div>
        ) : (
          /* 좌석이 비어있으면 기존 예약 폼 노출 */
          <form onSubmit={handleReserveSubmit} style={formStyle}>
            <input 
              type="text" 
              placeholder="학생 ID" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={inputStyle}
            />
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={submitButtonStyle}>
              예약하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- 🎨 모달 레이아웃 스타일북 ---
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalBoxStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '8px',
  width: '320px',
  position: 'relative',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  color: '#333333',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '15px', right: '15px',
  background: 'none',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  color: '#666',
};

const modalTitleStyle: React.CSSProperties = {
  margin: '0 0 20px 0',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: '#2575fc',
  color: '#ffffff',
  border: 'none',
  padding: '12px',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '5px',
};

const infoContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
};

const statusBadgeStyle: React.CSSProperties = {
  backgroundColor: '#e7f5ff',
  color: '#1c7ed6',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 'bold',
};

const timeInfoStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '15px',
};

const userInfoStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '14px',
  color: '#666',
  marginBottom: '10px',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#ff4d4d',
  color: '#ffffff',
  border: 'none',
  padding: '12px',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
};

export default SeatDetail;