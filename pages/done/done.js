// pages/done/done.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeLine: [],
    planTip: 'green',
    color: '#07c186'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({
      key: 'fillList',
      success: function (res) {
        that.setData({
          timeLine: res.data
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.getStorage({
      key: 'fillList',
      success: function (res) {
        that.setData({
          timeLine: res.data
        })
        wx.showToast({
          title: '已刷新',
          icon: 'success',
          duration: 1500,
          complete: function () {
            wx.stopPullDownRefresh()
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的计划时间轴',
      path: '/pages/done/done',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})