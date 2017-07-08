/**
 * Created by Administrator on 2017/7/4.
 */
var MongoClient = require("mongodb").MongoClient;
var setting = require("../setting.js");
function _connect(callback) {
    MongoClient.connect(setting.dbUrl, function (err, db) {
        callback(err, db);
    });
}

exports.insert = function (collectionName, data, callback) {
    _connect(function (err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        db.collection(collectionName).insert(data, function (err, data) {
            callback(err, data);
            db.close();
        });
    });
}

exports.find = function (collectionName, data, parameter, callback) {
    _connect(function (err, db) {
        if (err) {
            callback(err, null);
            return;
        }
        //获取留言总数量
        db.collection(collectionName).find(data).count(function (err, number) {
            if (err) {
                console.log(err);
                return;
            }
            var count = number;
            db.collection(collectionName).find(data).limit(parameter.limit).skip(parameter.skip*parameter.limit).toArray(function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                var data = {
                    "count": count,
                    "messages": result
                }
                callback(err, data);
            });
        });

    });
}

exports.remove = function(collectionName,removeDate,callback){
    _connect(function(err,db){
        if (err) {
            callback(err, null);
            return;
        }
        db.collection(collectionName).remove(removeDate,function(err,result){
            callback(err,result);
        });
    });
}

exports.update = function(collectionName,whereStr,updateStr,callback){
    _connect(function(err,db){
       if(err){
           callback(err,null);
           return;
       }
        db.collection(collectionName).update(whereStr,updateStr,function(err,result){
            callback(err,result);
        });
    });
}