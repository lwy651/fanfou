//app.js
const AV = require('./utils/av-weapp-min.js');

AV.init({
  appId: 'f1Y61SH1X9LcLTVEaFOdjQ3w-gzGzoHsz',
  appKey: 'o2XVFJQkb7np0QlWDWWEIjrk',
});

App({
  onLaunch: function () {
    var that = this;
    AV.User.loginWithWeapp().then(user => {
      that.globalData.user = user.toJSON();
    })
      .catch(console.error);
    var GuangZhou = new AV.Object('City');
    GuangZhou.set("name","广州");
    var GuangDong = new AV.Object('Province');
    GuangDong.set('name','广东');
    GuangZhou.set('dependent',GuangDong);
    GuangZhou.save().then(function(guangZhou){
      console.log(guangZhou);
    })
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
    globalData: null,
    user: null
  }
})