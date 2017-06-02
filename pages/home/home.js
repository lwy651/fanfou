const AV = require('../../utils/av-weapp-min');
const Fans = require('../../model/fans');
const app = getApp();

var fans = new Fans();
var query = new AV.Query('Fans');

Page({
  data: {
    currtBtn: false,
    userInfo: null
  },
  onLoad: function () {
    var that = this;
    that.loginAndFetchTodos();
  },
  loginAndFetchTodos: function () {
    console.log(AV.User.current().toJSON());
    query.equalTo('user', AV.User.current());
    query.find().then(function (result) {
      if (result.length > 0) {
        fans = result[0];
        console.log(fans.toJSON())
        //fans.eachstate = true;
      }
      else {
        fans.set("user", AV.User.current());
      }
    });
  },
  btnClick: function (e) {
    var that = this;
    // if (!that.data.user.realname) {
    //   wx.switchTab({
    //     url: '../user/user'
    //   })
    // }
    switch (e.currentTarget.id) {
      case "each":
        if (that.data.currtBtn)
          return;
        fans.set({ eachstate: true }).save().then(function (vaule) {
          //console.log(value);
          if (vaule.toJSON().eachstate) {
            that.setData({ currtBtn: true });
          }
        });
        break;
      case "noteach":
        if (!that.data.currtBtn)
          return;
        fans.set({ eachstate: false }).save().then(function (vaule) {
          //console.log(value);
          if (!vaule.toJSON().eachstate) {
            that.setData({ currtBtn: false });
          }
        });
        break;
    }
  },
  saveFan: function () {
    console.log(11111);
  }
})