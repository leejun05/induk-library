import { Link } from 'react-router-dom';
export default function Error() {
    return (
        <div style={{ margin: 10 }}>
            <h2>접속할 수 없는 URL 입니다.</h2>
            <Link to="/" style={{ marginRight: '10px' }}> Home으로 이동 </Link>
        </div>
    );
}
