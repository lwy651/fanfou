//app.js
const AV = require('./utils/av-weapp-min.js');
const Fans = require('./model/fans');

AV.init({
  appId: 'f1Y61SH1X9LcLTVEaFOdjQ3w-gzGzoHsz',
  appKey: 'o2XVFJQkb7np0QlWDWWEIjrk',
});

App({
  onLaunch: function () {
    var that = this;
    this.login().then(that.fetchTodos).catch(error => consolo.error(error.message));
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  login: function () {
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user => user ? user : AV.User.loginWithWeapp());
  },
  fetchTodos: function (user) {
    var that = this;
    console.log(user.toJSON().realname);
    const query = new AV.Query(Fans)
      .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .find().then(function (result) {
        if (result.length > 0) {
          that.globalData.fans = result[0]
        } else {
          var myfan = new Fans()
          myfan.set("user", AV.User.current())
          myfan.save()
            .then((fan) => { that.globalData.fans = fan })
            .catch(console.error)
        }
      })
  },
  globalData: {
    globalData: null,
    user: null,
    fans: null
  }
})