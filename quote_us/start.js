
/**
@fileOverview ./blocknext/start.js
@description
Start Web application.
 */

(function() {
  var start;

  start = function(__interface__) {

    /**
    Server initialization at a specified port.
    @module blocknext.app/start
     */
    var port;
    port = __interface__.app.get('port');
    __interface__.server.listen(port, function() {
      var loadedPort, logo;
      loadedPort = __interface__.server.address().port;
      logo = [];
      console.log(logo.join('\n'));
      console.log('Running on http://localhost:' + loadedPort);
    });
  };

  module.exports = start;

}).call(this);
