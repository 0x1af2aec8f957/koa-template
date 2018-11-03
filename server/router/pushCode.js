const Joi = require('joi')
const {execSync} = require('child_process')
const {PROCESS_DIR} = require('../util/constant')
const db = require('../../db/index')
const sendEmail = require('../controller/sendEmail')
// const {fetchTHistory} = require('./fetchResponse')

module.exports = {
  path: '/',
  method: 'get',
  schema: {
    head_commit: Joi.number().required(),
    repository: Joi.object().required(),
    ref: Joi.string().required(), // .error(new Error('Was REALLY expecting a string'))
  },
  function (ctx) {
    // ctx.redirect('/login');
    // ctx.status = 301;
    const {head_commit, repository, ref} = ctx.request.body
    const {title} = getCommonRecord(ctx)
    const stdout = execSync(`"./git_pull.sh"`, {cwd: PROCESS_DIR})

    db.main && db.main()

    const body = {
      stdout: `git终端消息：${stdout.toString()}`,
      title,
      name: `提交人：${head_commit.committer.name}`,
      subject: `${head_commit.committer.name}对站点提交了代码`,
      repository: `提交仓库：${repository.name}`,
      branch: `提交分支：${ref.split('/').slice(-1)[0]}`,
      message: head_commit.message,
      bcc: head_commit.committer.email,
    }

    sendEmail(body)
    ctx.body = body
  },
}