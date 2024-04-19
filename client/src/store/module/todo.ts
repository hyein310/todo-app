import { TodoState, Todo } from "../../types/interface";

const initialState: TodoState = {
    list: [],
};
let count = initialState.list.length;
initialState["nextID"] = count;

const INIT = "todo/INIT" as const;  // get 요청을 보내서 정보를 전달 받아서 initailState에 저장
const CREATE = "todo/CREATE" as const;  // as 형변환, string형이 아닌 그 값 "todo/CREATE"만 올 수 있음
const DONE = "todo/DONE" as const;
const DELETE = "todo/DELETE" as const;

export const init = (data: Todo[]) => ({
    type: INIT,
    data, // object {id, text, done}
});
export const create = (payload: {id: number, text: string}) => ({
    type:CREATE, // string
    payload, // object {id, text}
});
export const done = (id: number) => ({
    type:DONE, // string
    id, // number 
});
export const del = (id: number) => ({
    type: DELETE,  // string
    id, // number
});


interface Init {
    type: typeof INIT;
    data: Todo[];
}
interface Create {
    type: typeof CREATE;
    payload: {id: number, text: string};
}
interface Done {
    type: typeof DONE;
    id: number;
}
interface Delete {
    type: typeof DELETE;
    id: number;
}


type Action = Create | Done | Init | Delete;

export function todoReducer(state=initialState, action: Action) {
    switch (action.type) {
        case INIT:
            return {
                ...state, 
                list: action.data,
                nextID: action.data.length === 0? 1: action.data[action.data.length-1].id + 1,
            }
        case CREATE:
            if(action.payload.text.trim() === "") return state;

            return {
                // 기존에 있는 state의 list를 펼치고 list에 전달되어 오는 값을 펼치기
                ...state,
                list: state.list.concat({
                    id: action.payload.id,
                    text: action.payload.text,
                    done: false,
                }),
                nextID: action.payload.id + 1,
            }
        case DONE:
            return {
                ...state,
                list: state.list.map((li)=> {
                    if(li.id===action.id) {
                        return {
                            ...li,  // id, text 값은 그대로 두고
                            done: true,  // done 값만 변경                            
                            /*
                            - 이렇게 해도 동작
                            id: li.id,
                            text: li.text,
                            done: true,
                            */
                        }
                    }
                    else {
                        return li;
                    }
                }),
            };
            case DELETE:
                return {
                  ...state,
                  list: state.list.filter((li) => li.id !== action.id),
                };
        default:
            return state;
    }
}