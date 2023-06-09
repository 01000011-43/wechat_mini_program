const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  var app = getApp();

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//登录函数
function login(){
  let promise = new Promise((resolve,reject)=>{
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("res.code="+res.code)
        wx.request({
          url:'https://www.ccydqs.com/getcode',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log('loginres.data',res.data);
            wx.setStorageSync('openid',res.data.openid)
            getApp().globalData.token = res.data.token;
            resolve(res.data);
          }
        })
      }
    })
  })
  return promise;
}


module.exports = {
  formatTime,
  login,
}
