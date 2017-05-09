const { User } = require('../../utils/av-weapp-min');
const app = getApp();

//var fanQuery = new AV.Query('fans');

Page({
  data: {
    user: null,
    currtBtn: 0,
    userInfo: null
  },
  onLoad: function () {
    var that = this;
    that.data.user = User.current().toJSON();
    console.log(this.data.user);
    //User.current().set('realname','刘五一');
    //User.current().save();
    console.log(that.data.user.realname);

    console.log(User.current().id);
  },
  btnClick: function (e) {
    var that = this;
    if (that.data.user.realname) {
      wx.switchTab({
        url: '../user/user'
      })
    }
    switch (e.currentTarget.id) {
      case "each":
        this.setData({ currtBtn: 0 });
        //this.saveFan();
        break;
      case "noteach":
        this.setData({ currtBtn: 1 });
        this.saveFan();
        break;
    }
  },
  saveFan: function () {
  }
})