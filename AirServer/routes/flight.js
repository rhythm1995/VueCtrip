/**
 * 查询航班信息接口
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

// 查询 按照起飞地点与到达地点获取航班数据
router.get('/getFlightList', function (req, res, next) {
    // 从连接池获取连接
    pool
        .getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            // 建立连接 查询航班信息
            connection.query("SELECT * FROM flight_information", function (err, result) {
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
