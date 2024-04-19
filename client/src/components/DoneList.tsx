import {useSelector, useDispatch} from "react-redux";
import { ReduxState } from "../types/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { del } from "../store/module/todo";
import axios from "axios";

export default function DoneList() {
    const list = useSelector((state: ReduxState)=>state.todo.list);
    const doneList = list.filter((li)=>li.done === true);

    const dispatch = useDispatch();

    // delete 요청
    async function deleteTodo(todoId: number) {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
            console.log(res.data);
            
            dispatch(del(todoId));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    return (
        <section className="DoneList">
            <h2>⭐ 완료한 일</h2>
            {doneList.length === 0? (<p>다한게 없어용..</p>) : (
            <ul>
                {doneList.map((el) => (
            <li key={el.id}>
              <span>{el.text}</span>
              <span onClick={() => deleteTodo(el.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </li>
          ))}
            </ul>    
            )}

        </section>
    )
}