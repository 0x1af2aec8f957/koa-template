module.exports = {
  '系统管理': [
    {label: '获取账户资料', value: 'systemManagement:obtain'},
    {label: '创建账户', value: 'systemManagement:create'},
    {label: '删除账户', value: 'systemManagement:delete'},
    {label: '销毁账户', value: 'systemManagement:remove'},
    {label: '禁用账户', value: 'systemManagement:disabled'},
    {label: '修改账户', value: 'systemManagement:modify'},
  ],
  '用户系统': [
    {label: '获取用户资料', value: 'userSystem:obtain'},
    {label: '创建用户', value: 'userSystem:create'},
    {label: '禁用用户', value: 'userSystem:disabled'},
    {label: '修改用户', value: 'userSystem:modify'},
    {label: '删除用户', value: 'userSystem:delete'},
  ],
  '消息系统': [
    {label: '发送短消息', value: 'messageSystem:sendSms'},
    {label: '发送电子邮件', value: 'messageSystem:sendEmail'},
    {label: '发送站内信', value: 'messageSystem:sendPush'},
  ],
  '财务系统': [],
}