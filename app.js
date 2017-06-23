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
    console.log("11111111111111")
    var that = this;
    console.log(user);
    const query = new AV.Query(Fans)
      .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .find().then(function (result) {
        console.log("22222222")
        console.log(result.length)
        if (result.length > 0) {
          console.log("3333333")
          that.globalData.fans = result[0]
        } else {
          that.createFans();
        }
      }).catch(error => consolo.error(error.message));
  },
  createFans: () => {
    var myfan = new Fans()
    myfan.set("user", AV.User.current())
    myfan.save()
      .then((fan) => { that.globalData.fans = fan; console.log("收到数据") })
      .catch(error => consolo.error(error.message));
  },
  globalData: {
    globalData: null,
    user: null,
    fans: null
  }
})