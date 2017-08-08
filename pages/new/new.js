// pages/new/new.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['工作', '生活', '学习', '旅行', '美食', '其他'],
    objectArray: [
      {
        id: 0,
        name: '工作'
      },
      {
        id: 1,
        name: '生活'
      },
      {
        id: 2,
        name: '学习'
      },
      {
        id: 3,
        name: '旅行'
      },
      {
        id: 4,
        name: '美食'
      },
      {
        id: 5,
        name: '其他'
      }
    ],
    index: 0,
    dateStart: '',
    dateEnd: ''
  },

  bindCategory: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindDateStart: function (e) {
    this.setData({
      dateStart: e.detail.value
    })
  },

  bindDateEnd: function (e) {
    this.setData({
      dateEnd: e.detail.value
    })
  },

  planContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  planRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  submitPlan: function (e) {
    var planOne = {
      content: this.data.content,
      index: this.data.index,
      dateStart: this.data.dateStart,
      dateEnd: this.data.dateEnd,
      remark: this.data.remark,
      time: utils.formatDT(utils.formatDate()),
      day: utils.dateDiff(this.data.dateStart, this.data.dateEnd)
    }

    var value = wx.getStorageSync('planList');
    if (!value) {
      var planList = [];
      planList.push(planOne);
      wx.setStorage({
        key: 'planList',
        data: planList,
        success: function () {
          // console.log('存储成功！');
          wx.reLaunch({
            url: '/pages/home/home'
          })
        }
      })
    } else {
      wx.getStorage({
        key: 'planList',
        success: function (res) {
          res.data.push(planOne);
          wx.setStorage({
            key: 'planList',
            data: res.data,
            success: function () {
              // console.log('存储成功！');
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }
          })
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      dateStart: utils.formatDate(),
      dateEnd: utils.formatDate()
    })   
  }
})