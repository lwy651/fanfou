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
    var that = this;
    if (app.globalData.fans) {
      //that.setData({ fans: app.globalData.fans })
      //that.setData({ currtBtn: app.globalData.fans.toJSON().eachstate })
    }
    //that.loginAndFetchTodos();
  },
  // loginAndFetchTodos: function () {
  //   console.log(AV.User.current().toJSON());
  //   query.equalTo('user', AV.User.current());
  //   query.find().then(function (result) {
  //     if (result.length > 0) {
  //       fans = result[0];
  //       console.log(fans.toJSON())
  //       //fans.eachstate = true;
  //     }
  //     else {
  //       fans.set("user", AV.User.current());
  //     }
  //   });
  // },
  btnClick: function (e) {
    var that = this;
    if (!AV.User.current().toJSON().realname) {
      wx.switchTab({
        url: '../user/user'
      })
    }
    else {
      if (!app.globalData.fans)
        return
      switch (e.currentTarget.id) {
        case "each":
          app.globalData.fans.set({ eachstate: true }).save().then((result) => {
            //that.setData({ fans: result })
            that.setData({ currtBtn: result.toJSON().eachstate })
          })
          /*if (that.data.currtBtn)
            return;
          fans.set({ eachstate: true }).save().then(function (vaule) {
            //console.log(value);
            if (vaule.toJSON().eachstate) {
              that.setData({ currtBtn: true });
            }
          });*/
          break;
        case "noteach":
          app.globalData.fans.set({ eachstate: false }).save().then((result) => {
            //that.setData({ fans: result })
            that.setData({ currtBtn: result.toJSON().eachstate })
          })
          /*if (!that.data.currtBtn)
            return;
          fans.set({ eachstate: false }).save().then(function (vaule) {
            //console.log(value);
            if (!vaule.toJSON().eachstate) {
              that.setData({ currtBtn: false });
            }
          });*/
          break;
      }
    }
  },
  saveFan: function () {
    console.log(11111);
  }
})