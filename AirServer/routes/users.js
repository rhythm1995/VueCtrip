/**
 * 查询用户信息接口
 */

var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({code: '-200', msg: '操作失败'});
    } else {
        res.json(ret);
    }
};

// 添加用户
router.post('/addUser', function (req, res, next) {
    // 从连接池获取连接
    pool
        .getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接 增加一个用户信息
            connection.query("INSERT INTO user_customer(u_id,u_phone,u_name,u_email,u_pwd) VALUES(?,?,?,?,?)", [
                param.id, param.phone, param.name, param.email, param.pwd
            ], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                responseJSON(res, result);

                // 释放连接
                connection.release();

            });
        });
});

// 删除用户
router.get('/deleteUser', function (req, res, next) {
    // 从连接池获取连接
    pool
        .getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接 增加一个用户信息
            connection.query("DELETE FROM `user_customer` WHERE `u_id` = ?", [param.id], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '删除'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                responseJSON(res, result);

                // 释放连接
                connection.release();

            });
        });
});

// 修改用户信息
router.post('/updateUser', function (req, res, next) {
    // 从连接池获取连接
    pool
        .getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接 增加一个用户信息
            connection.query("UPDATE user_customer SET u_id=?,u_phone=?,u_name=?,u_email=?,u_pwd=?", [
                param.id, param.phone, param.name, param.email, param.pwd
            ], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                responseJSON(res, result);
                // 释放连接
                connection.release();

            });
        });
});

// 查询用户信息列表，用于管理系统
router.get('/getList', function (req, res, next) {
    // 从连接池获取连接
    pool
        .getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接 查询航班信息
            connection.query("SELECT u_id,u_phone,u_name,u_email,u_true_name FROM user_customer", function (err, result) {
                if (err) {
                    res.json(500);
                } else {
                    res.json(result);
                }
                // 释放连接
                connection.release();
            });
        });
});

module.exports = router;
