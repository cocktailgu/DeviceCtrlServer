var express = require('express');
var router = express.Router();
var fs = require('fs');
require('config');
require('getdate');
var datetime = new Date().Format('yyyy-MM-dd hh:mm:ss');
var filepath= global.__filepath;
var writecontrol = require('writectrltxt');

router.all('/',function (req,res,next){
    res.end("0");
});

router.all('/:type/:hostname/:auth',function (req,res,next){
    if (req.params.auth != global.__auth){
        console.log(datetime+":验证码不正确");
        res.end("0");
        return ;
    } 
    /*console.log(datetime+":请求主机的信息:type,"+ req.params.type +";hostname,"+req.params.hostname+";auth,"+req.params.auth+".");
    var fileIsExists = fs.existsSync(filepath+'/profiles.json');
    if (fileIsExists == false){
        console.log(datetime+":打开,"+ filepath+"/profiles.json文件失败");
        res.end("0");
        return;
    }
    var profiledata = fs.readFileSync(filepath+'/profiles.json','utf8');
    profiledata = JSON.parse(profiledata);
    var typejson = profiledata[req.params.type];
    if (typejson==undefined){
        console.log(datetime+":type参数无效");
        res.end("0");
        return ;
    }
    fileIsExists = fs.existsSync(filepath+'/'+typejson['profile']);
    if (fileIsExists == false){
        console.log(datetime+":打开,"+ filepath+'/'+typejson['profile']+"文件失败");
        res.end("0");
        return;
    }
    var hostdata = fs.readFileSync(filepath+'/'+typejson['profile'],'utf8');
    hostdata = JSON.parse(hostdata);
    var host = hostdata[req.params.hostname];
    if (host==undefined){
        console.log(datetime+":hostname参数无效");
        res.end("0");
        return ;
    }
    fs.writeFile(filepath+'/'+host['profile'],1);
    res.end("1");*/

    var flag = writecontrol.WriteTxt(filepath,req.params.type,req.params.hostname,1,datetime);
    
    /*if (flag == 1){
        res.end("f");
    } else {
        res.end("fff");
    }*/
    if (flag == 1){
        console.log(datetime+"开启"+req.params.hostname+"成功");   
        res.end("1");
    } else {
        console.log(datetime+"开启"+req.params.hostname+"失败");
        res.end("0");
    }
});

/*router.all('/:type/:hostname/:auth',function (req,res,next){
    if (req.params.auth != global.__auth){
        res.end("0");
        return ;
    }
    console.log(datetime+":请求主机的信息:type,"+ req.params.type +";hostname:"+req.params.hostname+".");
    //查看总体配置文件
    fs.readFile( filepath + "/" + "profiles.json", 'utf8', function (err, profiledata) {
        if(err){
            console.log(datetime+":无法打开profiles.json文件,"+err);
            res.end("0");
            return;
        }
        console.log(datetime+":打开:profiles.json文件");
        profiledata = JSON.parse(profiledata);
        var typejson = profiledata[req.params.type];

    //查看主机配置文件
    fs.readFile( filepath + "/" + typejson['profile'], 'utf8', function (err, data) {
        if (err){
            console.log(datetime+":无法打开"+typejson['profile']+"文件,"+err);
            res.end("0");
            return;
        }
        console.log(datetime+":打开:"+ typejson['profile']+"文件");
        data = JSON.parse(data);
        if (data[req.params.hostname] ==undefined){
            res.end(0);
            return ;
        }
        var host = data[req.params.hostname];
        console.log(datetime+":请求主机的信息"+ host['code'] );
        console.log(datetime+":获取控制文件"+ host['profile'] );
      
      //写入对应的控制文件
      fs.writeFile(filepath+"/"+host['profile'],1,function (err){
          if (err){
              console.log(datetime+":无法打开:"+ host['profile']+"文件"+err);
              res.end("0");
              return;
          }
          res.end("1");
          console.log(datetime+":成功写1到"+host['profile']+"控制文件\n");
      });
    });
  });
});
*/
module.exports = router;
