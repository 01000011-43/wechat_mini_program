// pages/confession/confession.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    text:'',
    type:'0',
    blurvalue:'',
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
  this.setData({
   showModal:true,
   blurvalue:'blur(10rpx)',
  })
 },
 /**
  * 点击返回按钮隐藏
  */
 back:function(){
  this.setData({
   showModal:false,
   blurvalue:'blur(0rpx)',
  })
 },
 /**
  * 获取input输入值
  */
 wish_put:function(e){
  this.setData({
   text:e.detail.value
  })
 },
 /**
  * 点击确定按钮获取input值并且关闭弹窗
  */
 ok:function(){
  var that = this
  this.setData({
   showModal:false,
   blurvalue:'blur(0rpx)',
  })

  wx.request({
    url:'https://www.ccydqs.com/insertConfession',
    data:{
      openid: wx.getStorageSync('openid'),
      text:that.data.text,
      type:that.data.type,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      wx.request({
        url:'https://www.ccydqs.com/confession',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            list:res.data.data,
          })
        }
      })
    },
  })

 },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url:'https://www.ccydqs.com/confession',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list:res.data.data,
        })
      }
    })
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

  }
})