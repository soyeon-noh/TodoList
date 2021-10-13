import "../../css/TodoInput.css";
import { useTodoContext } from "../../context";

function TodoInput() {
  const { todo, onChange, onClick, onKeyPress, inputId } = useTodoContext();
  return (
    <div className="form">
      <input
        value={todo.t_text}
        ref={inputId}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className="btn_insert" onClick={onClick}>
        추가
      </div>
    </div>
  );
}

export default TodoInput;
