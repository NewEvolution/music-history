define(["exports", "multiuse-functions", "jquery", "lodash"], function (exports, _multiuseFunctions, _jquery, _lodash) {
  "use strict";

  var searchQuery = undefined;
  var songsFilter = function songsFilter(searchQuery) {
    var sectionsToHide = [];
    var sectionsToShow = [];
    (0, _jquery)("section").each(function (e) {
      if ((0, _jquery)(this).text().toLowerCase().indexOf(searchQuery) !== -1) {
        sectionsToShow[sectionsToShow.length] = (0, _jquery)(this);
      } else {
        sectionsToHide[sectionsToHide.length] = (0, _jquery)(this);
      }
    });
    sectionsToHide = _lodash.difference(sectionsToHide, sectionsToShow);
    return sectionsToHide;
  };
  // Search button
  (0, _jquery)("#search-btn").click(function (e) {
    e.preventDefault();
    searchQuery = (0, _jquery)("#search").val().toLowerCase();
    var sectionsToHide = songsFilter(searchQuery);
    for (var i = 0; i < sectionsToHide.length; i++) {
      _multiuseFunctions.elementHide(sectionsToHide[i]);
    }
  });
  // Reset search field
  (0, _jquery)("#search-clear").click(function (e) {
    (0, _jquery)("#search").val("");
    var allHiddenSongs = (0, _jquery)("section.row.full-transparent");
    for (var i = 0; i < allHiddenSongs.length; i++) {
      _multiuseFunctions.elementReveal(allHiddenSongs[i]);
    }
  });
});
//# sourceMappingURL=search.js.map
