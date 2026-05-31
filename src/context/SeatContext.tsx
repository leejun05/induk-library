import React, { createContext, useState, useEffect } from 'react';

// 1. 단일 좌석 객체의 타입 정의
export interface Seat {
  id: number;
  seatNumber: string;
  reserved: boolean;
  userId: string | null;
  remainingTime: number; // 남은 시간 (초 단위)
}

// 2. Context가 전역으로 공유할 데이터들의 타입 정의 (💡여기에 cancelReservation을 추가해야 에러가 사라집니다!)
interface SeatContextType {
  seats: Seat[];
  availableSeatsCount: number;
  totalSeatsCount: number;
  reserveSeat: (id: number, userId: string) => void;
  cancelReservation: (id: number) => void; // ➔ 🔍 [핵심 조치] 여기에 타입을 선언해 줍니다!
}

export const SeatContext = createContext<SeatContextType | undefined>(undefined);

export const SeatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 초기 기본 좌석 데이터 15개 세팅 (A구역 5개, B구역 10개)
  const [seats, setSeats] = useState<Seat[]>([
    { id: 1, seatNumber: 'A1', reserved: false, userId: null, remainingTime: 0 },
    { id: 2, seatNumber: 'A2', reserved: false, userId: null, remainingTime: 0 },
    { id: 3, seatNumber: 'A3', reserved: false, userId: null, remainingTime: 0 },
    { id: 4, seatNumber: 'A4', reserved: false, userId: null, remainingTime: 0 },
    { id: 5, seatNumber: 'A5', reserved: false, userId: null, remainingTime: 0 },
    { id: 6, seatNumber: 'B1', reserved: false, userId: null, remainingTime: 0 },
    { id: 7, seatNumber: 'B2', reserved: false, userId: null, remainingTime: 0 },
    { id: 8, seatNumber: 'B3', reserved: false, userId: null, remainingTime: 0 },
    { id: 9, seatNumber: 'B4', reserved: false, userId: null, remainingTime: 0 },
    { id: 10, seatNumber: 'B5', reserved: false, userId: null, remainingTime: 0 },
    { id: 11, seatNumber: 'B6', reserved: false, userId: null, remainingTime: 0 },
    { id: 12, seatNumber: 'B7', reserved: false, userId: null, remainingTime: 0 },
    { id: 13, seatNumber: 'B8', reserved: false, userId: null, remainingTime: 0 },
    { id: 14, seatNumber: 'B9', reserved: false, userId: null, remainingTime: 0 },
    { id: 15, seatNumber: 'B10', reserved: false, userId: null, remainingTime: 0 },
  ]);

  // ⏱️ 실시간 타이머 작동 (예약된 좌석의 시간을 1초마다 감소시키고 0초가 되면 자동 반납)
  useEffect(() => {
    const timer = setInterval(() => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => {
          if (seat.reserved && seat.remainingTime > 0) {
            const nextTime = seat.remainingTime - 1;
            // 0초가 되면 자동으로 빈 좌석으로 리셋
            if (nextTime === 0) {
              return { ...seat, reserved: false, userId: null, remainingTime: 0 };
            }
            return { ...seat, remainingTime: nextTime };
          }
          return seat;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🚀 [기능 1] 좌석 예약 함수 (60초 제공)
  const reserveSeat = (id: number, userId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, reserved: true, userId, remainingTime: 60 } : seat
      )
    );
  };

  // 🛑 [기능 2] 예약 취소(반납) 함수 (💡 새로 구현한 실체 로직!)
  const cancelReservation = (id: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, reserved: false, userId: null, remainingTime: 0 } : seat
      )
    );
  };

  // 📊 상단 바 및 홈 대시보드 연동을 위한 카운트 계산
  const totalSeatsCount = seats.length;
  const availableSeatsCount = seats.filter((seat) => !seat.reserved).length;

  return (
    <SeatContext.Provider
      value={{
        seats,
        availableSeatsCount,
        totalSeatsCount,
        reserveSeat,
        cancelReservation, // ➔ 하위 컴포넌트들이 쓸 수 있게 배달통에 넣어줍니다.
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};