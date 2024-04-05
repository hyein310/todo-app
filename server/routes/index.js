const express = require("express");
const router = express.Router();
const controlloer = require("../controller/Cmain");

// GET /api-server
router.get("/", controlloer.getIndex);

// GET /api-sever/todos
// 전체 Todo 데이터 불러오기 >> 프론트로 배열 반환
router.get("/todos", controlloer.getTodos);

// POST /api-server/todo
// 새로운 Todo 만들기 >> {isSuccess: true}
router.post("/todo", controlloer.postTodo);

// -------- 밑에는 숙제

// PATCH /api-server/todo/:todoId
// 특정 Todo(todoId)의 done 값 수정 (할 일 -> 다한 일) + (다한 일 + 할 일)

// DELETE /api-server/todo/:todoId
// 특정 Todo 삭제

module.exports = router;