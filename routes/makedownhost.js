var express = require('express');
var router = express.Router();
var fs = require('fs');
require('config');
require('getdate');
var datetime = new Date().Format('yyyy-MM-dd hh:mm:ss');
var filepath= global.__filepath;
var writecontrol = require('writectrltxt');

router.all('/',function (req,res,next){
  res.end("abc");
});

router.all('/:type/:hostname/:auth/:status',function (req,res,next){
    if (req.params.auth != global.__auth){
        console.log(datetime+":验证码不正确");
        res.end("0");
        return ;
    } 
    var flag = writecontrol.WriteTxt(filepath,req.params.type,req.params.hostname,0,datetime);
    if (flag == 1){
        console.log(datetime+"开启"+req.params.hostname+"成功");   
        res.end("1");
    } else {
        console.log(datetime+"开启"+req.params.hostname+"失败");
        res.end("0");
    }
});
module.exports = router;
