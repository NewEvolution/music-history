import * as mf from "es6!multiuse-functions";
import * as $ from "jquery";
import * as _ from "lodash";
let searchQuery;
let songsFilter = searchQuery => {
  let sectionsToHide = [];
  let sectionsToShow = [];
  $("section").each(e => {
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
$("#search-btn").click(e => {
  e.preventDefault();
  searchQuery= $("#search").val().toLowerCase();
  let sectionsToHide = songsFilter(searchQuery);
  for (let i = 0; i < sectionsToHide.length; i++) {
    mf.elementHide(sectionsToHide[i]);
  }
});