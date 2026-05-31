import React from 'react';

export default function CartSummary({ totalQuantity, totalPrice }) {
    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '15px', textAlign: 'right' }}>
            <h1>결제 예정 정보</h1>
            <p>총 상품 수량: <strong>{totalQuantity}</strong> 개</p>
            <h3>총 결제 금액: <span style={{ color: 'blue' }}>{totalPrice.toLocaleString()}원</span></h3>
        </div>
    );
}