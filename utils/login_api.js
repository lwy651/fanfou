const AV = require('./av-weapp-min.js')
const Fans = require('./../model/fans.js')

const fetchFans = (user) => {
  console.log(99999999)
  console.log(parent())
  console.log(user.toJSON());
  const query = new AV.Query(Fans)
    .equalTo('user', AV.Object.createWithoutData('User', user.id))
    .find().then(function (result) {
      console.log("22222222")
      console.log(result.length)
      if (result.length > 0) {
        console.log("3333333")
        parent().globalData.fans = result[0]
      } else {
        createFans();
      }
    }).catch(error => consolo.error(error.message));
}

const createFans = () => {
  var userfans = new Fans()
  userfans.set("user", AV.User.current())
  userfans.save()
    .then((fan) => { console.log(fan.toJSON()); console.log("maimapi") })
    .catch(error => consolo.error(error.message));
}

const av_login = () => {
  AV.Promise.resolve(AV.User.current()).then(user =>
    user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
  ).then(user => user ? user : AV.User.loginWithWeapp()).then(fetchFans).catch(error => consolo.error(error.message));
}



module.exports = {
  av_login: av_login
}