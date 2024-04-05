import { TodoState } from "../../types/interface";

const initialState: TodoState = {
    list: [
        {
            id: 0,
            text: "리액트 공부하기",
            done: false,
        },
        {
            id: 1,
            text: "운동하기",
            done: false,
        },
        {
            id: 2,
            text: "저녁 먹기",
            done: false,
        },
    ],
};
let count = initialState.list.length;
initialState["nextID"] = count;


const CREATE = "todo/CREATE" as const;  // as 형변환, string형이 아닌 그 값 "todo/CREATE"만 올 수 있음
const DONE = "todo/DONE" as const;

export const create = (payload: {id: number, text: string}) => ({
    type:CREATE, // string
    payload, // object {id, text}
})
export const done = (id: number) => ({
    type:DONE, // string
    id, // number 
});

// interface Action {
//     type: string;
//     id?: number;
//     payload?: {id: number, text: string};
// }

interface Create {
    type: typeof CREATE;
    payload: {id: number, text: string};
}
interface Done {
    type: typeof DONE;
    id: number;
}
type Action = Create | Done;

export function todoReducer(state=initialState, action: Action) {
    switch (action.type) {
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
        default:
            return state;
    }
}