import React, { createContext, useContext, useRef, useState } from "react";

/**
 * React Context API 기능을 활용하여
 * state를 관리하는 도구
 *
 * 다중 구조의 컴포넌트가 겹쳐있는 경우
 * state 를 전파하는 것이 매우 불편한 코드로 작성될 수 있다.
 *
 * 이럴때 Context API를 활용하여
 * state와 공용으로 사용할 여러가지 함수를 Store에 보관하고
 * 필요한 곳에서만 useContext()를 사용하여 쉽게 getter할 수 있도록
 * 도와주는 컴포넌트
 *
 * Context를 생성하기
 * 생성된 Context에 state 등을 보관하고
 * useContext() Hook을 커스터마이징하여 손쉽게 사용할 수 있도록 한다.
 *
 * Context를 사용할 컴포넌트들을
 * 합성 패턴을 이용하여 관리할 수 있도록 한다.
 */

// 컨텍스트 생성
const AppContext = createContext();

// 컨텍스트의 Store에 보관된 정보들을 추출하기 위한 Hook 함수를 선언
export const useTodoContext = () => {
  return useContext(AppContext);
};

// export const useTodoContext = () => {
//   return useContext(AppContext);
// };

// Provider를 합성패턴으로 선언하여
// 필요한 곳에서 끌어올려 사용할 수 있도록 한다.
function AppContextProvider({ children }) {
  // TODO 정보 1개를 보관할 state
  const [todo, setTodo] = useState({
    t_id: 0,
    t_text: "",
    t_comp: false,
  });

  const [todoList, setTodoList] = useState([]);

  // Refferrence 변수 선언하기
  const nextId = useRef(0); // 정수형변수
  const inputId = useRef(); // tag를 selete 하는 용도로 사용가능

  const onChange = (e) => {
    const t_text = e.target.value;
    // ES6 이후에는 객체에 값을 담을때
    // 객체의 키 이름과 같은 변수에 담긴 값을 담을 때는
    // 키 이름 한번만 사용해도 된다.
    // ex ) {t_text : t_text } 는 { t_text } 처럼 사용가능
    //   setTodo({ ...todo, t_text: t_text });
    setTodo({ ...todo, t_text, t_id: nextId.current });
  };

  // 리스트에 추가하기
  const todoInsert = (e) => {
    if (todo.t_text === "") {
      alert("할 일을 입력하세요");
      inputId.current.focus();
      return;
    }
    setTodoList([...todoList, todo]);
    nextId.current++;

    todoClear();
  };

  // 입력창 clear
  const todoClear = () => {
    setTodo({ t_id: nextId.current, t_text: "", t_comp: false });
  };

  // 입력된 todo를 todoList에 추가하기
  const onClick = (e) => todoInsert(e);

  // 입력박스에서 Enter Key가 눌러지면
  const onkeyPress = (e) => {
    // e.keyCode === 13 // Enter키
    if (e.key === "Enter") {
      todoInsert(e);
      // ESC키 (작동안됨;)
    } else if (e.key === "Escape") {
      // } else if (e.keyCode === 27) {
      todoClear();
    }
  };

  const onClickDelete = (e) => {
    if (window.confirm("삭제할까요?")) {
      // TodoItem.jsx에서 data-todo-id 라고 저장하면
      // 앞에 data-는 dataset으로 변경
      // todo-id는 todoId와 같이 lower Camel case로 변경된다.
      /** 문자열로 들어오기때문에 숫자형으로 형변환 */
      const t_id = Number(e.target.dataset.todoId);

      // 배열 요소중에서 t_id 가 일치하는 요소를 삭제하기
      // 원래 배열요소를 filtering 하는데
      // t_id 값이 dataset의 todoId 와 일치하지 않는 것만
      // 새로운 배열로 만들어라.
      const _todoList = todoList.filter((todo) => todo.t_id !== t_id);
      console.table(_todoList);
      setTodoList(_todoList);
      alert("삭제됨" + t_id);
    }
  };

  const onCompClick = (e) => {
    const t_id = Number(e.target.dataset.todoId);

    // 배열 요소중에 조건에 맞는 값이 있으면
    // 그 값이 몇번째 요소인지 index를 return 한다.

    const index = todoList.findIndex((todo) => todo.t_id === t_id);
    // 찾았으면

    // 해당 요소만 따로 추출하여 selectTodo에 담기
    const selecteTodo = todoList[index];

    const _todoList = [...todoList];
    _todoList[index] = {
      // index에 해당하는 값만 변화시키는 것
      ...selecteTodo,
      t_comp: !selecteTodo.t_comp,
    };
    setTodoList(_todoList);
  };

  const propsStore = {
    todo,
    todoList,
    onChange,
    onClick,
    onkeyPress,
    inputId,
    onClickDelete,
    onCompClick,
  };

  return (
    <AppContext.Provider value={propsStore}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
