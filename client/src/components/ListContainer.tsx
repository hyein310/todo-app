import DoneList from "./DoneList";
import TodoList from "./TodoList";

export default function ListContainer() {
    return (
        <div className="ListContainer">
            <TodoList></TodoList>
            <br />
            <br />
            <DoneList></DoneList>
        </div>
    )
}