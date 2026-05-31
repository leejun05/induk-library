import { useNavigate, useParams } from 'react-router-dom';
export default function TodoViewer() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // localSotrage에서 todo 목록 데이터 읽어오기
    const saved = localStorage.getItem('my-todos');
    const todos = saved ? JSON.parse(saved) : [];
    const todo_item = {};
    todos.map((item) => {
        if (item.id == id) {
            todo_item.id = item.id;
            todo_item.text = item.text;
            todo_item.checked = item.checked;
        }
    });
    return (
        <div style={{ margin: 10 }}>
            <p>- ID : {id} </p>
            <p>- 할일 내용 : {todo_item.text} </p>
            <p>- 할일 여부 : {todo_item.checked ? " 완료" : "미완료"}</p>
            <input type="button" onClick={() => navigate(-1)} value="뒤로가기" />
        </div>
    );
}