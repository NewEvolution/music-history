define(function(require) {
  var mf = require("multiuse-functions");
  var $ = require("jquery");
  var _ = require("lodash");
  var searchQuery;
  var songsFilter = function(searchQuery) {
    var sectionsToHide = [];
    var sectionsToShow = [];
    $("section").each(function(e) {
      if($(this).text().toLowerCase().indexOf(searchQuery) !== -1) {
        sectionsToShow[sectionsToShow.length] = $(this);
      } else {
        sectionsToHide[sectionsToHide.length] = $(this);
      }
    });
    sectionsToHide = _.difference(sectionsToHide, sectionsToShow);
    return sectionsToHide;
  };
  // Search button
  $("#search-btn").click(function(e) {
    e.preventDefault();
    searchQuery= $("#search").val().toLowerCase();
    var sectionsToHide = songsFilter(searchQuery);
    for (var i = 0; i < sectionsToHide.length; i++) {
      mf.elementHide(sectionsToHide[i]);
    }
  });
});