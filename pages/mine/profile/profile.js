// pages/mine/profile/profile.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    tel:'',
    email:'',
    stuid:'',
    name:'',
    type:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  bindBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
  * 控制显示
  */
 eject:function(e){
  var type = e.currentTarget.dataset.type;
  console.log('eject',type);

  this.setData({
   showModal:true,
   type:type,
  })
  console.log('this.data.type',this.data.type);
 },
 /**
  * 点击返回按钮隐藏
  */
 back:function(){
  this.setData({
   showModal:false
  })
 },
 /**
  * 获取input输入值
  */
 wish_put:function(e){
   if(this.data.type=='tel'){
    this.setData({
      tel:e.detail.value
    })
  }
  if(this.data.type=='email'){
    this.setData({
      email:e.detail.value
    })
  }
  if(this.data.type=='stuid'){
    this.setData({
      stuid:e.detail.value
    })
  }
  if(this.data.type=='name'){
    this.setData({
      name:e.detail.value
    })
  }
 },
 /**
  * 点击确定按钮获取input值并且关闭弹窗
  */
 ok:function(){
  var that = this
  this.setData({
   showModal:false
  })

  wx.request({
    url:'https://www.ccydqs.com/insertProfile',
    data:{
      openid: wx.getStorageSync('openid'),
      tel:that.data.tel,
      email:that.data.email,
      name:that.data.name,
      stuid:that.data.stuid,
      type:that.data.type
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
    },
  })

 },

 getPhoneNumber (e) {
  var that = this;
  if(e.detail.errMsg == "getPhoneNumber:ok"){
    wx.request({
      url:'https://www.ccydqs.com/getPhoneNumber',
      data:{
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        session_key: app.globalData.session_key
      },
      method:"get",
      success:function(res){
        console.log('order_phone_res.data=',res.data);
        that.setData({
          userPhone:res.data
        })
      }
    })
  }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
          email:res.data.data[0].email,
          name:res.data.data[0].name,
          stuid:res.data.data[0].stuid,
        })
      },
    })

    util.login().then((res1)=>{
      console.log('profile res1=',res1);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  }
})