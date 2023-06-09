// pages/mine/mine.js

// 获取应用实例
const app = getApp()

Page({
  data: {
    name:'未设置',
    tel:'未设置',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  viewProfile() {
    wx.navigateTo({
      url: './profile/profile'
    })
  },
  

  // 事件处理函数
  onLoad() {
    var that = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    wx.getStorage({
      key: 'profile',
      success (res) {
        that.setData({
          name: res.data[0].name,
          stuid:res.data[0].stuid
        })
      }
    })

    wx.request({
      url:'https://www.ccydqs.com/profile',
      data:{
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync('profile',res.data.data);
        that.setData({
          list:res.data.data,
          tel:res.data.data[0].tel,
          name:res.data.data[0].name,
        })
      },
    })

  },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})


