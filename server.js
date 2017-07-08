/**
 * Created by Administrator on 2017/7/5.
 */
var express = require("express");
var app = express();
var router = require('./controller/router.js')
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));
//设置模版引擎
app.set("view engine", "ejs");

app.use(express.static("./public"));
//主页
app.get("/", function (req, res, next) {
    router.showIndex(req, res, next);
});
//添加留言
app.post("/add", function (req, res) {
    router.addMessage(req, res);
});
//删除留言
app.post("/remove", function (req, res) {
    router.removeMessage(req, res);
});
//修改留言
app.post("/update",function(req,res){
    router.updateMessage(req,res);
});
app.use(function (req, res) {
    res.render("404");
});

app.listen(80);