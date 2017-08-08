/**
 * Created by yajun on 17/8/1 
 */

// 获取日期全格式  2017-08-01 00:00:01
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取日期格式  2017-08-01
function formatDate(dt) {
  if (!dt) {
    dt = new Date()
  }
  dt = new Date()
  var year = dt.getFullYear()
  var month = dt.getMonth() + 1
  var day = dt.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

// 获取日期格式  2017/08/01
function formatDT(dt) {
  if (!dt) {
    dt = new Date()
  }
  dt = new Date()
  var year = dt.getFullYear()
  var month = dt.getMonth() + 1
  var day = dt.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '/' + month + '/' + day
}

// 日期转天数
function dateDiff(sDate1, sDate2) {        
  var aDate, oDate1, oDate2
  aDate = sDate1.split('-')
  oDate1 = new Date(aDate[0],aDate[1],aDate[2])     
  aDate = sDate2.split('-')
  oDate2 = new Date(aDate[0],aDate[1],aDate[2])
  return Math.ceil((oDate2 - oDate1) / 86400000)
}

// 数组排序
function compare(property) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}

// px转rpx
function px2rpx(px, windowWidth) {
  return Math.round(px * 750 / windowWidth)
}
// rpx转px
function rpx2px(rpx, windowWidth) {
  return Math.round(rpx / 750 * windowWidth)
}

// 获取用户微信信息
function getUserInfo (cb) {
  var that = this
  wx.login({
    success: function () {
      wx.getUserInfo({
        success: function (res) {
          typeof cb == 'function' && cb(res.userInfo)
        },
        fail: function (res) {
          typeof cb == 'function' && cb({
            avatarUrl: '../../images/icon/user@default.png',
            nickName: '我的计划书'
          })
        }
      })
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo,
  formatTime: formatTime,
  formatDate: formatDate,
  formatDT: formatDT,
  dateDiff: dateDiff,
  compare: compare,
  px2rpx: px2rpx,
  rpx2px: rpx2px,
}
