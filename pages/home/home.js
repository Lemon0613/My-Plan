// pages/home/home.js

var utils = require('../../utils/util.js');

Page({

  data: {
    planList: [],
    delBtnWidth: 300,//删除按钮宽度单位（rpx）
    showModels: false,
    fillNum: 0
  },

  pageToNew: function () {
    wx.navigateTo({
      url: '/pages/new/new'
    })
  },

  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...',
    })
    this._loadData();
    this._updatePlan();
  },

  _updatePlan: function () {
    var that = this;
    wx.getStorage({
      key: 'planList',
      success: function (res) {
        res.data.forEach(function(item, index) {        
          item.remainDay = utils.dateDiff(utils.formatDate(), item.dateEnd);
        })
        var planList = res.data;
        planList.sort(utils.compare('remainDay'));
        that.setData({
          planList: planList
        })
      }
    })
  },

  _loadData: function ()  {
    utils.getUserInfo((data) => {
      this.setData({
        userInfo: data
      })
      wx.setStorage({
        key: "userInfo",
        data: data
      })
      wx.hideLoading();
    })
  },

  showDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var show = this.data.planList[index];
    this.setData({
      showModels: true,
      showContent: show.content,
      showDT: show.dateStart,
      showDL: show.dateEnd,
      showRemark: show.remark
    })
  },

  closedetails: function () {
    this.setData({
      showModels: false
    })
  },

  /**
   * 左滑删除
   */
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = that.data.startX - moveX;
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left: 0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.planList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        planList: list
      });
    }
  },
  touchE: function (e) {
    var that = this;
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left: 0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.planList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        planList: list
      });
    }
  },

  delItem: function (e) {
    var index = e.target.dataset.index;
    // console.log(index);
    var list = this.data.planList;
    var that = this;
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: '#ff423a',
      success: function (res) {
        console.log(res.tapIndex)
        list.splice(index, 1);
        that.setData({
          planList: list
        });
        wx.setStorage({
          key: 'planList',
          data: list,
          success: function () {
            // console.log('删除成功！');
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })

  },

  fillItem: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.planList;
    var fillOne = list[index];
    list.splice(index, 1);
    var that = this;
    wx.showToast({
      title: '已完成',
      icon: 'success',
      duration: 1000,
      success: function () {
        that.setData({
          planList: list
        });
        wx.setStorage({
          key: 'planList',
          data: list
        })
        var fill = wx.getStorageSync('fillList');
        if (!fill) {
          // console.log('第一次完成');
          var fillList = [];
          fillList.push(fillOne);
          wx.setStorage({
            key: 'fillList',
            data: fillList,
            success: function () {
              // console.log('标记成功！');
              that.setData({
                fillNum: fillList.length
              });               
            }
          })
        } else {
          // console.log('第N次完成')
          wx.getStorage({
            key: 'fillList',
            success: function (res) {
              res.data.push(fillOne);
              console.log(res.data)
              wx.setStorage({
                key: 'fillList',
                data: res.data,
                success: function () {
                  // console.log('存储成功！');
                  that.setData({
                    fillNum: res.data.length
                  });
                }
              })
            }
          })
        }
        
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var fillList = wx.getStorageSync('fillList');
    if (!fillList) {
      // console.log('无存储数据')
      this.setData({
        fillNum: 0
      });
    } else {
      // console.log('有存储数据')
      wx.getStorage({
        key: 'fillList',
        success: function (res) {
          that.setData({
            fillNum: res.data.length
          });
        }
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的计划书',
      path: '/pages/home/home',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})