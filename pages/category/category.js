// pages/category/category.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortImg: 2,
    cateTitle: '',
    mainTitle: '',
    cateDate: '',
    cateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sortImg: options.sortImg,
      cateTitle: options.title,
      mainTitle: options.mainTitle
    })
    this._loadCate(options.sortImg - 1);
  },

  _loadCate: function (type) {
    var that = this;
    var newData=[];
    wx.getStorage({
      key: 'planList',
      success: function (res) {
        res.data.forEach(function (item, index) {
          var cate = item.index;
          if(cate == type){
            newData.push(item);
          }
        })
        var cateDate;
        if (newData.length > 0) {
          cateDate = newData[newData.length - 1].dateStart;
        } else {
          cateDate = utils.formatDate(new Date());
        }
        that.setData({
          cateList: newData,
          cateDate: cateDate
        })
      }
    })
  }

})