// pages/user/user.js
const { User } = require('../../utils/av-weapp-min');
var app = getApp()
Page({
  data: {
    userInfo: null,
    realname: ""
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
          console.log(that.data.realname)
          User.current().set('realname', that.data.realname);
          User.current().save();
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
    console.log(33333);
  }
})