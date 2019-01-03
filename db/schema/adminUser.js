const {Regex} = require('../../service/util/constant')

module.exports = {
  name: 'adminUser',
  schema: {
    createTime: {type: Date, default: Date.now},
    updateTime: {type: Date, default: Date.now},
    name: {type: String, default: '木头人哦~'}, // 用户姓名
    account: {type: String, required: true}, // 账号
    disabled: {type: Boolean, default: false}, // 禁用
    phone: { // 手机
      type: String,
      validate: {
        validator: value => Regex.PHONE.test(value),
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    email: { // 邮箱
      type: String,
      validate: {
        validator: value => Regex.EMAIL.test(value),
        message: props => `${props.value} is not a valid email!`,
      },
    },
    roles: [{type: String, required: true}], // 权限
    password: {type: String, minLength: 6, maxLength: 22, required: true}, // 密码
    explain: {type: String, maxLength: 500},
  },
}

/*
* @remark
*
* +++ 注意单个文档最大为16M的数据量，谨慎在数据库设计上使用嵌入文档 -> [注意使用TTL索引来自动清理过期数据 | 新建一个集合用来描述大型关系网]
* +++ 谨慎使用自动构建索引等小号性能的功能，避免宕机
* --- 合理使用连表查询 -> Example : const record = await Promise.all(await ctx.db.User.findById(ctx.userId).map(async projectId => await ctx.db.Project.findById(projectId, 'address name createTime _id')))
* +++ 注意ObjectId是一个对象而不是字符串 -> Example : const projectIndex = (await ctx.db.User.findById(ctx.userId)).followRecords.findIndex(projectId => projectId.equals(ctx.request.query.id))
*
* */