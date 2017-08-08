// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/banner/banner01.jpg',
      '/images/banner/banner02.jpg',
      '/images/banner/banner03.jpg',
      '/images/banner/banner04.jpg',
      '/images/banner/banner05.jpg',
      '/images/banner/banner06.jpg'
    ],
    indicatorColor: 'rgba(7,193,134,0.5)',
    indicatorDots: true,
    autoplay: true, 
    category: [
      { title: '@ 工作', url: '/images/sort/cate01.jpg' },
      { title: '@ 生活', url: '/images/sort/cate02.jpg' },
      { title: '@ 学习', url: '/images/sort/cate03.jpg' },
      { title: '@ 旅行', url: '/images/sort/cate04.jpg' },
      { title: '@ 美食', url: '/images/sort/cate05.jpg' },
      { title: '@ 其他', url: '/images/sort/cate06.jpg' },
     ]
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  pageToCate: function (e) {
    var index = e.currentTarget.dataset.index + 1;
    var title = this.data.category[index - 1].title.substr(2);
    var mainTitle = [
      '效率是做好工作的灵魂',
      '有理想的人 生活总是火热的',
      '学习本无底 前进莫徬徨',
      '旅行是对庸常生活的一次越狱',
      '餐桌旁的时光最有趣',
      '闲时无计划 忙时多费力'
    ];

    // console.log(title) 
    wx.navigateTo({
      url: '/pages/category/category' + '?sortImg=' + index + '&title=' + title + '&mainTitle=' + mainTitle[index-1],
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的计划主题',
      path: '/pages/plan/plan',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})