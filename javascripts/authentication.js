define(function(require) {
  var uid = null;
  return {
    getUid: function() {
      return uid;
    },
    setUid: function(newId) {
      uid = newId;
    }
  };
});