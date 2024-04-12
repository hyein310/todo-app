const { text } = require("express");
const { Todo } = require("../models");
const { where } = require("sequelize");

// test용 api
exports.getIndex = (req, res) => {
    res.send("response from api server [GET /api-server]");
};
exports.getUser = (req, res) => {
    res.send("response from api server [GET /api-server/user]");
};

// GET /api-server/todos
exports.getTodos = async(req, res) => {
    try{
        const todoAll = await Todo.findAll();  // [{id, text, done}]
        res.json(todoAll);
    }
    catch(err){
        console.log("server error!", err);
        res.status(500).send("SERVER ERROR!, 관리자에게 문의바랍니다.")
    }
};

// POST /api-server/todo
exports.postTodo = async(req, res) => {
    /* {
        id : 모델 정의시, auto_increment 속성 추가해두었음 (x)
        text : 할 일 (o)
        done : 모델 정의시 false(0)를 defaultValue 처리해두었음 (x)
    } */
    try{
        // req.body = {text: "~~~~~~~~~"}
        const { text } = req.body;
        await Todo.create({
            text,
        });
        res.send({isSuccess: true});
    }
    catch(err){
        console.log("server error!", err);
        res.status(500).send("SERVER ERROR!, 관리자에게 문의바랍니다.")
    }
};

exports.deleteTodo = async(req, res) => {
    console.log(req.body);
    const { id } = req.body;
    
    try {
        await Todo.destroy({
            where: {id: id}
        });
        res.send({isDeleted: true});
    }
    catch(err) {
        console.log("server error!", err);
        res.status(500).send("SERVER ERROR!, 관리자에게 문의바랍니다.")
    }
}