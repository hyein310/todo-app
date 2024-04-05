import { useEffect } from "react";
import DoneList from "./DoneList";
import TodoList from "./TodoList";
import { useDispatch } from "react-redux";
import axios from "axios";
import { init } from "../store/module/todo";

export default function ListContainer() {
    async function getTodoAll() {
        const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/todos`);
        /* 
        API 서버에 요청을 보내기 위해서는
        Api 서버가 켜져있어야 합니다!!
        */
        console.log(res.data); 
        if (res.data) dispatch(init(res.data));   
    }
    const dispatch = useDispatch();
    
    useEffect(()=> {
        getTodoAll();
    }, []);

    return (
        <div className="ListContainer">
            <TodoList></TodoList>
            <br />
            <br />
            <DoneList></DoneList>
        </div>
    )
}