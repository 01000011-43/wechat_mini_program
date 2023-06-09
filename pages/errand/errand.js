// pages/errand/errand.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:['校内','校外'],
    currentTab:0,
    uhide:0,
    showModal: false,
    blurvalue:'',
  },

  bindBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
  * 点击+号控制显示
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
   blurvalue:'',
  })
 },
 /**
  * 获取form输入值
  */

 /**
  * 点击确定按钮获取input值并且关闭弹窗
  */
 formSubmit: function (e){
   var that = this
   this.setData({
     showModal:false,
     blurvalue:'blur(0rpx)',
   })
   console.log("formSubmit",e.detail.value);
   let {pickuploc,destination,pickuptime,reward,type,size,proof,note} = e.detail.value;
   if(e.detail.value.pickuploc!=="" && e.detail.value.pickuptime!=="" && e.detail.value.destination!==""){

      wx.request({
     url:'https://www.ccydqs.com/insertErrands',
     data: {
      pickuploc: pickuploc,
      destination: destination,
      pickuptime :pickuptime,
      reward:reward,
      type:type,
      size:size,
      proof : proof,
      note:note
    },
      header: {
      'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         wx.request({
        url:'https://www.ccydqs.com/wxdb',
         header: {
        'content-type': 'application/json' // 默认值
        },
         success: function (res) {
          console.log('res.data.data',res.data.data)
         that.setData({
         list01:res.data.data,
      })
    }
  })

    }
  })
     
   }else{
    wx.showToast({
      title:'*栏不能为空',
      icon:'loading',
      duration:1500
    })
    setTimeout(function(){
      wx.hideToast()
    },2000)
   }
 },


  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url:'https://www.ccydqs.com/wxdb',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('res.data.data',res.data.data)
        that.setData({
          list01:res.data.data,
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
      var that = this
    wx.request({
      url:'https://www.ccydqs.com/wxdb',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('res.data.data',res.data.data)
        that.setData({
          list01:res.data.data,
        })
      }
    })

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
  
    //点击切换隐藏和显示
    getDetail: function (event) { 
      var that = this;
      var getDetail = that.data.uhide;
      var itemId = event.currentTarget.id; 
      if (getDetail == itemId) {
        that.setData({
          uhide: 0
        })
      } else {
        that.setData({
          uhide: itemId
        })
      } 
    },

    


})