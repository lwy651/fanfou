// pages/user/user.js
const { User } = require('../../utils/av-weapp-min');
var app = getApp()
var nowDate = new Date();
//var monthDays = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate()
var monthDays = new Date(2017, 2, 0).getDate()
// var startDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getDay()
var startDay = new Date(2017, 2, 1).getDay()

Page({
  data: {
    userInfo: null,
    fans: null,
    user: null,
    dayNames: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    days: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var daysArr = [];
    for (var i = 0; i < monthDays + startDay - 1; i++) {
      daysArr[i] = i + 1 - startDay + 1;
    }
    that.setData({ days: daysArr })
    that.setData({ fans: app.globalData.fans })
    that.setData({ user: User.current() })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  btnClick: function () {
    var that = this;
    wx.showModal({
      title: '确认姓名！',
      content: this.data.realname,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(User.current().toJSON())
          User.current().set('realname', that.data.realname);
          User.current().save().then((result => {
            that.setData({ user: result })
          }));
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.saveRealName();
        }
      }
    })
  },
  inputChange: function (e) {
    var that = this;
    that.data.realname = e.detail.value;
  },
  saveRealName: function () {
    console.log('cancel');
  },
  getDaysInMonth: function (month, year) {
    return new Date(year, month + 1, 0).getDate() - new Date(year, month, 0).getDate();
  },
  monthStartDay: function (thisYear, thisMonth) {
    var date = new Date(thisYear, thisMonth, 1);
    var startDay = date.getDay();

    if (startDay == 0) {
      startDay = 7;
    }

    return startDay;
  }
})