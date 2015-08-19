define(function(require){
  var mf = require("multiuse-functions");
  var $ = require("jquery");
  var songToDelete =[];
  var songToEdit = [];
  return {
    handlers: function(myFirebaseRef){
      // Hide button on song list
      $(".content").on("click", ".hide-btn", function(e) {
        mf.elementHide($(this).parents(".song-section"));
        if($("#filter-reset").hasClass("full-transparent")) {
          mf.elementReveal($("#filter-reset"));
        }
      });
      // Edit button on song list
      $(".content").on("click", ".edit-btn", function(e) {
        songToEdit = mf.getClickedSong($(this));
        $("#edit-title").val(songToEdit[1].title);
        $("#edit-artist").val(songToEdit[1].artist);
        $("#edit-album").val(songToEdit[1].album);
        $("#edit-genre").val(songToEdit[1].genre);
        $('#edit-modal').modal('show');
      });
      // Confirm edit button on modal edit window
      $("#confirm-edit").click(function(e) {
        var editedSong = {};
        editedSong.title = $("#edit-title").val();
        editedSong.artist = $("#edit-artist").val();
        editedSong.album = $("#edit-album").val();
        editedSong.genre = $("#edit-genre").val();
        myFirebaseRef.child("songs").child(songToEdit[0]).set(editedSong);
        songToEdit = [];
      });
      // Delete button on song list
      $(".content").on("click", ".delete-btn", function(e) {
        songToDelete = mf.getClickedSong($(this));
        $("#delete-title").html(songToDelete[1].title);
        $("#delete-artist").html(songToDelete[1].artist);
        $('#delete-modal').modal('show');
      });
      // Confirm delete button on modal delete warning
      $("#confirm-delete").click(function(e) {
        myFirebaseRef.child("songs").child(songToDelete[0]).set(null);
        songToDelete = [];
      });
    }
  };
});