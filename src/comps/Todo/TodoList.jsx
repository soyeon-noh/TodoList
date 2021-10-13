import { useTodoContext } from "../../context";
import "../../css/TodoList.css";
import { TodoItem } from "../index";

function TodoList() {
  const { todoList } = useTodoContext();
  const list_view = todoList.map((item) => {
    return <TodoItem todo={item} key={item.t_id} />;
  });
  return <div>{list_view}</div>;
}

export default TodoList;
