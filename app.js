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
  },
  globalData: {
    user: null
  }
})