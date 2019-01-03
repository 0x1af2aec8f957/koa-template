// db base

// doc:https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose')
const {db: mongooseOptions = {}} = require('../config')
const {resolve, getFiles} = require('../service/util/common')
const filesSchemas = getFiles(resolve('db', 'schema')) // .filter(item => !~item.indexOf('index.js'))
const filesMiddlewares = getFiles(resolve('db', 'middleware')) // .filter(item => !~item.indexOf('index.js'))
const schemas = filesSchemas.map(path => require(path))
const middlewares = filesMiddlewares.map(path => require(path))

const db = mongoose.connection

db.on('error', error => console.log('\033[30;41m ERROR \033[31;40m Mongodb connection error:' + error + '\033[0m\n'))
db.once('open', console.log.bind(console, '\033[30;44m SUCCESS \033[34;40m Mongodb connection success!\033[0m\n'))

mongoose.connect('mongodb://localhost/test', {
  ...mongooseOptions,
  useNewUrlParser: true, // 使用新的规则解析url链接
  useFindAndModify: false // 需要使用Model.findOneAndUpdate()
})

module.exports = schemas.reduce((acc, /*cur*/{name, schema}) => {
  const [
    currentName,
    currentSchema,
    currentMiddleware,
  ] = [
    name.replace(/^\S{1}/g, s => s.toUpperCase()),
    new mongoose.Schema(schema),
    middlewares.find(middleware => middleware.name === name)
  ]

  currentMiddleware && currentSchema.method(currentMiddleware.method) // Adds an instance method to documents constructed from Models compiled from this schema.

  return {
    ...acc,
    [currentName]: mongoose.model(currentName, currentSchema)/*return model*/,
  }
}, {})

/*
* @doc:console color
* \033[字色编号;背景色编号m
*
* @grammar：
* 字色编号：37黑，31红，32绿，33黄，34蓝，35紫，36深绿，30白色
* 背景编号：47黑，41红，42绿，43黄，44蓝，45紫，46深绿，40白色
*
* @other:
  \033[0m 关闭所有属性
  \033[1m 设置高亮度
  \033[4m 下划线
  \033[5m 闪烁
  \033[7m 反显
  \033[8m 消隐
  \033[nA 光标上移n行
  \033[nB 光标下移n行
  \033[nC 光标右移n列
  \033[nD 光标左移n列
  \033[y;xH 设置光标位置（y列x行）
  \033[2J 清屏
  \033[K 清除从光标到行尾的内容
*/