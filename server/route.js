// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const {execSync} = require('child_process')
const {PROCESS_DIR} = require('./constant')
const db = require('../db')
const sendEmail = require('./sendEmail')
// const {fetchTHistory} = require('./fetchResponse')

db.main()

const router = new Router()

router.get('/', async (ctx, next) => {
  // ctx.router available
  await ctx.render('home', {msg:'hello koa2'})ƒ
}).post('/pushCode', ctx => {

  const {head_commit, repository, ref} = ctx.request.body
  const {title} = getCommonRecord(ctx)
  const stdout = execSync(`"./git_pull.sh"`, {cwd: PROCESS_DIR})

  db.main()

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
})

module.exports = router