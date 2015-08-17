define(["jquery"], function($){
  return {
    handlers: function(){
      $(".content").on("click", ".hide-btn", function(e) {
        elementHide($(this).parents(".song-section"));
        if($("#filter-reset").hasClass("full-transparent")) {
          elementReveal($("#filter-reset"));
        }
      });

      $(".content").on("click", ".edit-btn", function(e) {
        songToEdit = getClickedSong($(this), retrievedSongsObj);
        $("#edit-title").val(songToEdit[1].title);
        $("#edit-artist").val(songToEdit[1].artist);
        $("#edit-album").val(songToEdit[1].album);
        $("#edit-genre").val(songToEdit[1].genre);
        $('#edit-modal').modal('show');
      });

      $("#confirm-edit").click(function(e) {
        var editedSong = {};
        editedSong.title = $("#edit-title").val();
        editedSong.artist = $("#edit-artist").val();
        editedSong.album = $("#edit-album").val();
        editedSong.genre = $("#edit-genre").val();
        myFirebaseRef.child("songs").child(songToEdit[0]).set(editedSong);
        songToEdit = [];
      });

      $(".content").on("click", ".delete-btn", function(e) {
        songToDelete = getClickedSong($(this), retrievedSongsObj);
        $("#delete-title").html(songToDelete[1].title);
        $("#delete-artist").html(songToDelete[1].artist);
        $('#delete-modal').modal('show');
      });

      $("#confirm-delete").click(function(e) {
        myFirebaseRef.child("songs").child(songToDelete[0]).set(null);
        songToDelete = [];
      });
    }
  };
});