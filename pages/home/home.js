const AV = require('../../utils/av-weapp-min');
const Fans = require('../../model/fans');
const app = getApp();

var fans = new Fans();
var query = new AV.Query('Fans');

Page({
  data: {
    currtBtn: false,
    fans: null
  },
  onLoad: function () {
    console.log("load")
    var that = this;
  },

  btnClick: function (e) {
    var that = this;
    if (!AV.User.current().toJSON().realname) {
      wx.switchTab({
        url: '../user/user'
      })
    }
    else {
      console.log(app.globalData.test)
      if (!app.globalData.fans)
        return
      switch (e.currentTarget.id) {
        case "each":
          app.globalData.fans.set({ eachstate: true }).save().then((result) => {
            that.setData({ currtBtn: result.toJSON().eachstate })
          })
          break;
        case "noteach":
          app.globalData.fans.set({ eachstate: false }).save().then((result) => {
            that.setData({ currtBtn: result.toJSON().eachstate })
          })
          break;
      }
    }
  },
  saveFan: function () {
    console.log(11111);
  }
})