var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article', function(req, res, next) {
  var rs = [];
  
  fs.readFile('./public/data/article.json', function(err, data) {
    if(err){
      rs = [];
    } else {
      rs = JSON.parse(data.toString());
    }
    res.send(rs);
  })
});

router.get('/news', function(req, res, next) {
  var rs = [];
  
  fs.readFile('./public/data/news.json', function(err, data) {
    if(err){
      rs = [];
    } else {
      rs = JSON.parse(data.toString());
    }
    res.send(rs);
  })
})

router.get('/classification', function(req, res, next) {
  var rs = [];
  
  fs.readFile('./public/data/classification.json', function(err, data) {
    if(err){
      rs = [];
    } else {
      rs = JSON.parse(data.toString());
    }
    res.send(rs);
  })
})

router.get('/search', function(req, res, next) {
  var rs = [];
  console.log(req.query);
  rs = [{s: req.query.s}]
  res.send(rs);
})

router.post('/reg', function(req, res, next) {
  var rs = [];
  const reqData = {
    "username" : req.body.username,
    "password" : req.body.password
  };
  var result = {
    status: 0,
    info: "注册失败"
  };

  fs.readFile('./public/data/user.json', function(err, data) {
    if(err) {
      result.info = err;
    }
    rs = JSON.parse(data.toString());
    rs.push(reqData);
    fs.writeFile('./public/data/user.json', JSON.stringify(rs), function(err) {
      if(err) {
        result.info = err;
      }
      else {
        result = {
          status: 1,
          info: "注册成功"
        }
      }
      res.send(result);
    })
  })
  

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
  });

  

  
})

module.exports = router;
