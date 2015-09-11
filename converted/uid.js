define(["exports", "module"], function (exports, module) {
  "use strict";

  var uid = null;
  module.exports = {
    getUid: function getUid() {
      return uid;
    },
    setUid: function setUid(newId) {
      uid = newId;
    }
  };
});
//# sourceMappingURL=uid.js.map
