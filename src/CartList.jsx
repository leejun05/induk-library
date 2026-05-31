import React from 'react';

export default function CartList({ items, onIncrease, onDecrease, onRemove }) {
    if (items.length === 0) return <p>장바구니가 비어 있습니다.</p>;

    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map(item => (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <div>
                        <strong>{item.name}</strong> - {item.price.toLocaleString()}원
                    </div>
                    <div>
                        <button onClick={() => onDecrease(item.id)}>-</button>
                        <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)}>+</button>
                        <button 
                            onClick={() => onRemove(item.id)} 
                            style={{ marginLeft: '15px', color: 'red' }}
                        >
                            삭제
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}