import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create, done } from "../store/module/todo";
import { ReduxState } from "../types/interface";
import axios from "axios";

export default function TodoList() {
    const list = useSelector((state: ReduxState)=> state.todo.list);
    // console.log(list); // [{id, text, done}]
    
    const todoList = list.filter((li)=>li.done === false); // done값이 false인 것만 리스트에서 선별
    // console.log(todoList);

    const dispatch = useDispatch();
    const todoRef = useRef<HTMLInputElement>(null);
    const nextID = useSelector((state: ReduxState)=>state.todo.nextID); 
    const [addTodo, setAddTodo] = useState();

    async function createTodo() {
        // dispatch({type:"todo/CREATE", payload:{id:3, text: todoRef.current.value}});
        // nextID 대신 list.length를 사용하면 더 간단하게 사용 가능
        // dispatch(create({id: list.length, text: todoRef.current.value}));
        
        // const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/todos`);
        // console.log(res.data);
        
        /* [TODO] 여기서 post 요청해보기!!! */
        // 서버로 보내줘야함
        try {
            console.log(nextID)
            // 조건을 현재 값이 공백이 아니고 존재하며, nextID가 들어 올 때만 실행하게 함
            if (todoRef.current &&nextID && todoRef.current.value.trim() !== "") {
                    const text = todoRef.current.value;
                    const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/todos`, { text });
                    console.log(res.data);
                    // 추가될 때마다 nextID와 text가 추가됨
                    dispatch(create({ id: nextID, text: text }));
                    todoRef.current.value = "";
            } else {
                console.error("할 일을 입력하세요.");
            }
        } catch (error) {
            console.error("서버 요청 중 오류가 발생했습니다:", error);
            // 오류 처리 로직을 추가합니다.
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