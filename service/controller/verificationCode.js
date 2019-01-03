const codeObjects = {}

const options = {
  delay: 120, // 验证码有效时间[Minute] /* 1 < delay < 35791.39411 */
}

exports.config = option => Object.assign(options, option)

function randomString (len = 6) { // 随机字符串6
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let pwd = ''
  for (let i = 0; i < len; i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  return pwd
}

function generateRandomString () {
  const values = randomString()
  return Object.entries(codeObjects).find(([key, value]) => value === values)
    ? generateRandomString()
    : values
}

exports.set = (key, len) => {
  const value = generateRandomString(len)
  codeObjects[key || value] = value
  const timer = setTimeout(() => {
    delete codeObjects[key]
    clearTimeout(timer)
  }, options.delay * 60000)
  console.log(`Successfully generated a verification code:{${key || value}:${value}}\n`)
  return value
}

exports.get = code => {
  let keyAssignments = ''
  const record = Object.entries(codeObjects).find(([key, value]) => {
    if (code === value) {
      keyAssignments = key
      return true
    }
    return false
  })
  if (record) delete codeObjects[keyAssignments]
  return record
}
