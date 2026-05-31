import React, { useState } from 'react';
import CartList from './CartList';
import CartSummary from './CartSummary';
const initialCartData = [
    { id: 1, name: '기계식 키보드', price: 120000, quantity: 1 },
    { id: 2, name: '무선 마우스', price: 85000, quantity: 2 },
    { id: 3, name: 'QHD 모니터', price: 350000, quantity: 1 }
];
export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState(initialCartData);
    const totalQuantity = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalPrice = cartItems.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    const handleIncrease = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // 수량 감소 
    const handleDecrease = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id && item.quantity > 1 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
        ));
    };
    const handleRemove = (id) => { // 항목 삭제 함수
        setCartItems(cartItems.filter((cartItems,i) => i !==id));
    }; 
return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    <h2>장바구니</h2>
        <CartList
            items={ cartItems }
            onIncrease={ handleIncrease }
            onDecrease={ handleDecrease }
            onRemove={ handleRemove }
        />
        <CartSummary
            totalQuantity={ totalQuantity }
            totalPrice={ totalPrice }
        />
        </div>
    );
}