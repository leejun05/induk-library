import { useParams, useNavigate } from "react-router-dom";

export default function TodoViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const saved = localStorage.getItem('my-todos');
  const todos = saved ? JSON.parse(saved) : [];
  const todoItem = todos.find((item) => item.id === id);

  return (
    <div style={{ padding: '20px' }}>
      <h2>할 일 상세 보기</h2>
      
      {todoItem ? (
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>내용:</strong> {todoItem.text}</p>
          <p><strong>상태:</strong> {todoItem.completed ? "완료" : "미완료"}</p>
        </div>
      ) : (
        <p style={{ color: 'red' }}>해당 데이터를 찾을 수 없습니다.</p>
      )}

      <button onClick={() => navigate(-1)} style={{ marginTop: '10px' }}>
        뒤로가기
      </button>
    </div>
  );
}