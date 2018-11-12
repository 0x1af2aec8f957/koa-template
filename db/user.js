const {Regex} = require('../server/util/constant')

module.exports = {
  name: 'user',
  schema: {
    createTime: {type: Date, default: Date.now},
    updateTime: {type: Date, default: Date.now},
    userName: {type: String, default: '木头人哦~'}, // 用户名
    sex: {type: Number, min: 0, max: 1, default: 0}, // 性别 [0-男,1-女]
    birthday: {type: Date, default: Date.now}, // 生日
    photo: { // 头像
      type: String,
      default: 'https://i.loli.net/2018/11/10/5be6e66d4b2f1.png',
    },
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
    address: String, // 所在地
    personalProfile: {type: String, maxLength: 150}, // 个人简介
    password: {type: String, minLength: 6, maxLength: 22, required: true}, // 密码
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