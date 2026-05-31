import React, { createContext, useState } from 'react';

// 1. 유저 정보 타입 정의
interface User {
  id: string;
}

// 2. AuthContext가 공유할 데이터들의 타입 정의
interface AuthContextType {
  user: User | null;
  login: (id: string) => void;
  logout: () => void;
}

// 3. createContext에 초기값(1개의 인수)을 넣어 에러 해결!
// 다른 파일에서 에러가 나지 않도록 null 혹은 기본 함수들을 채워줍니다.
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// 4. children의 타입(React.ReactNode) 지정
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // null = 로그인 안된 상태

  const login = (id: string) => {
    setUser({ id });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};