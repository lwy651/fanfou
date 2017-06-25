//app.js
const AV = require('./utils/av-weapp-min.js')
const Fans = require('./model/fans.js')
const login_api = require('./utils/login_api.js')

AV.init({
  appId: 'f1Y61SH1X9LcLTVEaFOdjQ3w-gzGzoHsz',
  appKey: 'o2XVFJQkb7np0QlWDWWEIjrk',
});

App({
  onLaunch: function () {
    console.log("launch")
    var that = this;
    login_api.av_login();
    //this.login().then(that.fetchTodos).catch(error => consolo.error(error.message));
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
  globalData: {
    test: "asdasdasd",
    user: null,
    fans: null
  }
})