var db = require('../model/db.js');
//主页
exports.showIndex = function(req,res,next){
    var parameter = '';
    if (req.query.page) {
        parameter = {
            "limit": 10,
            "skip": req.query.page
        }
    } else {
        parameter = {
            "limit": 10,
            "skip": 0
        }
    }

    db.find("messages", {}, parameter, function (err, data) {
        if(err){
            console.log(err)
            next();
            return;
        }
        var data = {
            "datas": {
                "messages": data.messages,
                "count": data.count,
                "page": parameter.skip
            }
        };
        res.render("index", data);
    });
}


exports.addMessage = function(req,res){
    var data = {
        "username": req.body.username,
        "message": req.body.message
    }
    db.insert("messages", data, function (err, result) {
        if (err) {
            res.send("添加失败!");
            return;
        }
        res.send("添加成功!");
    });
}

exports.removeMessage = function(req,res){
    var removeDate = {
        "username" : req.body.username
    }
    db.remove("messages",removeDate,function(err,result){
        if(err){
            res.send("删除失败");
            return;
        }
        res.send("删除成功");
    })
}

exports.updateMessage = function(req,res){
    var whereStr = {
        'username':req.body.oldname
    }
    var updateStr = {
        'username':req.body.newusername,
        'message':req.body.newmessage
    }
    db.update('messages',whereStr,updateStr,function(err,result){
        if(err){
            res.send("修改失败");
            return;
        }
        res.send("修改成功");
    })
}