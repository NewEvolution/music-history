define(["exports", "module", "multiuse-functions", "jquery"], function (exports, module, _multiuseFunctions, _jquery) {
  "use strict";

  var songToDelete = [];
  var songToEdit = [];

  module.exports = function (myFirebaseRef) {
    // Hide button on song list
    (0, _jquery)(".content").on("click", ".hide-btn", function (e) {
      _multiuseFunctions.elementHide((0, _jquery)(this).parents(".song-section"));
      if ((0, _jquery)("#filter-reset").hasClass("full-transparent")) {
        _multiuseFunctions.elementReveal((0, _jquery)("#filter-reset"));
      }
    });
    // Edit button on song list
    (0, _jquery)(".content").on("click", ".edit-btn", function (e) {
      songToEdit = _multiuseFunctions.getClickedSong((0, _jquery)(this));
      (0, _jquery)("#edit-title").val(songToEdit[1].title);
      (0, _jquery)("#edit-artist").val(songToEdit[1].artist);
      (0, _jquery)("#edit-album").val(songToEdit[1].album);
      (0, _jquery)("#edit-genre").val(songToEdit[1].genre);
      (0, _jquery)('#edit-modal').modal('show');
    });
    // Confirm edit button on modal edit window
    (0, _jquery)("#confirm-edit").click(function (e) {
      var editedSong = {};
      editedSong.title = (0, _jquery)("#edit-title").val();
      editedSong.artist = (0, _jquery)("#edit-artist").val();
      editedSong.album = (0, _jquery)("#edit-album").val();
      editedSong.genre = (0, _jquery)("#edit-genre").val();
      myFirebaseRef.child("songs").child(songToEdit[0]).set(editedSong);
      songToEdit = [];
    });
    // Delete button on song list
    (0, _jquery)(".content").on("click", ".delete-btn", function (e) {
      songToDelete = _multiuseFunctions.getClickedSong((0, _jquery)(this));
      (0, _jquery)("#delete-title").html(songToDelete[1].title);
      (0, _jquery)("#delete-artist").html(songToDelete[1].artist);
      (0, _jquery)('#delete-modal').modal('show');
    });
    // Confirm delete button on modal delete warning
    (0, _jquery)("#confirm-delete").click(function (e) {
      myFirebaseRef.child("songs").child(songToDelete[0]).set(null);
      songToDelete = [];
    });
  };
});
//# sourceMappingURL=song-list-handlers.js.map
