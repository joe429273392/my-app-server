var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  var rs = [];
  var result = {
    status: 0,
    info: "用户名或密码错误"
  };
  fs.readFile('./public/data/user.json', function(err, data) {
    if(err){
      result = {
        status: 0,
        info: err
      };
    }
    rs = JSON.parse(data.toString());

    var username = req.body.username || "";
    var password = req.body.password || "";
  
    for(let user of rs){
      if(user.username === username && user.password === password){
        result = {
          status: 1,
          info: "登录成功"
        };
      }
    }
    
    res.send(result);
  })

  
})

module.exports = router;
