import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";

export default function TodoList() {
    const list = useSelector((state: ReduxState)=> state.todo.list);
    // console.log(list); // [{id, text, done}]
    
    const todoList = list.filter((li)=>li.done === false); // done값이 false인 것만 리스트에서 선별
    // console.log(todoList);

    const dispatch = useDispatch();
    const todoRef = useRef<HTMLInputElement>(null);
    const nextID = useSelector((state: ReduxState)=>state.todo.nextID); 

    const createTodo = () => {
        // dispatch({type:"todo/CREATE", payload:{id:3, text: todoRef.current.value}});
        // nextID 대신 list.length를 사용하면 더 간단하게 사용 가능
        // dispatch(create({id: list.length, text: todoRef.current.value}));
        if(nextID && todoRef.current) {
        dispatch(create({id: nextID, text: todoRef.current.value}));
        todoRef.current.value = "";
        }
    };

    return (
        <section className="TodoList">
            <h2>✍️ 오늘의 할 일</h2>
            <div>
                <input type="text" placeholder="Todo" ref={todoRef}/>
                <button onClick={createTodo}> 할 일 추가</button>
            </div>
            <ul>
                {/* <li>
                    <span>할 일3</span> <button>완료</button>
                </li> */}
                {todoList.map((todo)=> {
                    return (
                        <li key={todo.id}>
                            <span>{todo.text}</span>
                            {/* <button onClick={()=>dispatch({type:"todo/DONE", id:todo.id})}>완료</button> */}
                            <button onClick={()=>dispatch(done(todo.id))}>완료</button>
                            
                        </li>
                    );
                })}
            </ul>
        </section>
    )
}