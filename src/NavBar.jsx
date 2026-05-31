import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f5f5f5', marginBottom: '20px'}}>
            <Link to="/"    style={{ marginRight: '10px' }}>Home</Link>
            <Link to="todolist"    style={{ marginRight: '10px' }}>TodoList</Link>
        </nav>
    )
}