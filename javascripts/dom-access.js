define(["jquery"],function($) {
  var $targetDiv = $(".content");
  return {
    getDomElement: function() {
      return $targetDiv;
    }
  };
});