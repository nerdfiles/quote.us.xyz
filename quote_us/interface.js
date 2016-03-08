
/**
@fileOverview ./blocknext/interface.js
 */

(function() {
  module.exports = function(__interface__) {
    var e, error, indexRoute;
    try {
      indexRoute = new require('./modules/home/index')(__interface__.app);
    } catch (error) {
      e = error;
      console.log(e);
    }
    return __interface__;
  };

}).call(this);
