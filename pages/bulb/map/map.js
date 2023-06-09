// pages/bulb/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"https://www.ccydqs.com/wx_images/pku_map.JPG"
  },
 // 长按保存功能--授权部分
saveImage (e) {
  let _this = this
  wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
          let url = e.currentTarget.dataset.url;
          wx.getSetting({
              success: (res) => {
                  if (!res.authSetting['scope.writePhotosAlbum']) {
                      wx.authorize({
                          scope: 'scope.writePhotosAlbum',
                          success: () => {
                              // 同意授权
                              _this.saveImgInner(url);
                          },
                          fail: (res) => {
                              console.log(res);
                              wx.showModal({
                                  title: '保存失败',
                                  content: '请开启访问手机相册权限',
                                  success(res) {
                                      wx.openSetting()
                                  }
                              })
                          }
                      })
                  } else {
                      // 已经授权了
                      _this.saveImgInner(url);
                  }
              },
              fail: (res) => {
                  console.log(res);
              }
          })   
      },
      fail(res) {
          console.log(res.errMsg)
      }
  })
},
// 长按保存功能--保存部分
saveImgInner (url) {
  wx.getImageInfo({
      src: this.data.url,
      success: (res) => {
          let path = res.path;
          wx.saveImageToPhotosAlbum({
              filePath: path,
              success: (res) => {
                  console.log(res);
                  wx.showToast({
                      title: '已保存到相册',
                  })
              },
              fail: (res) => {
                  console.log(res);
              }
          })
      },
      fail: (res) => {
          console.log(res);
      }
  })
},

  bindBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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