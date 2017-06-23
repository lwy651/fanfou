const AV = require('../utils/av-weapp-min.js');

class Fans extends AV.Object {
  get eachstate() {
    return this.get('eachstate');
  }
  set eachstate(value) {
    this.set('eachstate', value);
  }
}

AV.Object.register(Fans);
module.exports = Fans;