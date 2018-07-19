var express = require('express');
var router = express.Router();
var YAML = require('yamljs');
var fs = require("fs");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// file为文件所在路径
/* GET users listing. */
router.get('/', function (req, res, next) {
  var data = YAML.parse(fs.readFileSync('/Users/shirlychen/practice/nodeProject/node-/data/imgSize.yaml').toString());
  var imgSizes = {};
  Object.keys(data.parameters).forEach((key, index) => {
    if (key.indexOf('image_sizes') !== -1) {
      let keyArray = key.split('.');
      keyArray = keyArray.filter((item)=>{
        return item !== 'imagine_filter' && item !=='image_sizes'
      })
      // console.log(keyArray)
      keyArray.pop();
      const newKey = keyArray.join('.');
      if(key.indexOf('width')!== -1) {
        imgSizes[newKey] = data.parameters[key] + 'x' + data.parameters[key.replace('width','height')] 
      }
    }
  })
  console.log(imgSizes);
  // console.log(imgSizes)
  res.render('index', { title: 'my home' });
});

// router.post('/upload',function(req,res,next) {
//   console.log(req.body)
//   var data = YAML.parse(fs.readFileSync('/Users/shirlychen/practice/nodeProject/node-/data/imgSize.yaml').toString());
//   console.log(data)
// })
// router.post("/upload", upload.single('file'),(req, res) => {

//   // req.file 是 'file' 文件的信息 （前端传递的文件类型在req.file中获取）
//   // req.body 将具有文本域数据，如果存在的话  。（上面前端代码中传递的date字段在req.body中获取）
//   console.log(req) //{ date: '2018/1/20 下午5:25:56' }

//   // ---------- 因为保存的文件为二进制，取消下面代码块注释可让保存的图片文件在本地文件夹中预览 ------

// })
module.exports = router;
