const AV = require('../../utils/av-weapp-min');
const Fans = require('../../model/fans');
const app = getApp();

var fans = new Fans();

Page({
  data: {
    currtBtn: false,
    userInfo: null
  },
  onLoad: function () {
    var that = this;
    //that.loginAndFetchTodos();

    //fans.userid = AV.User.current();
    //fans.set('userid', AV.User.current());
    fans.save();
    fans.fetch().then(function (fan) {
      // // fan 是从服务器加载到本地的 fan 对象
      console.log(fan.toJSON());
      that.setData({ currtBtn: false });
    }).catch(console.error);
  },
  loginAndFetchTodos: function () {

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
          console.log(value);
          if (vaule.toJSON().eachstate) {
            that.setData({ currtBtn: true });
          }
        });
        break;
      case "noteach":
        if (!that.data.currtBtn)
          return;
        fans.set({ eachstate: false }).save().then(function (vaule) {
          console.log(value);
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