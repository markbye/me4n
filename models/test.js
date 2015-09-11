"use strict";
var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型

var testScheMa = new Schema({
    pathname: String,
    pointx: String,
    pointy: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联

//exports.test = mongoose.model('lists', testScheMa); //  与test集合关联


var T = mongoose.model('lists', testScheMa);
var test = mongoose.model('lists');

exports.add = function(data,callback){
    var newTodo = new test();
    newTodo.pathname = data.pathname;
    newTodo.pointx = data.pointx;
    newTodo.pointy = data.pointy;

    newTodo.save(function(err){
        if(err){
            console.log('fail+'+err)
            callback(err)
        }else{
            callback(null);
        }
    })
}

exports.findAll = function(callback){
    T.find({},callback)
}

