define(["exports","module","multiuse-functions","jquery"],function(e,t,n,r){"use strict";var i=[],s=[];t.exports=function(e){(0,r)(".content").on("click",".hide-btn",function(e){n.elementHide((0,r)(this).parents(".song-section")),(0,r)("#filter-reset").hasClass("full-transparent")&&n.elementReveal((0,r)("#filter-reset"))}),(0,r)(".content").on("click",".edit-btn",function(e){s=n.getClickedSong((0,r)(this)),(0,r)("#edit-title").val(s[1].title),(0,r)("#edit-artist").val(s[1].artist),(0,r)("#edit-album").val(s[1].album),(0,r)("#edit-genre").val(s[1].genre),(0,r)("#edit-modal").modal("show")}),(0,r)("#confirm-edit").click(function(t){var n={};n.title=(0,r)("#edit-title").val(),n.artist=(0,r)("#edit-artist").val(),n.album=(0,r)("#edit-album").val(),n.genre=(0,r)("#edit-genre").val(),e.child("songs").child(s[0]).set(n),s=[]}),(0,r)(".content").on("click",".delete-btn",function(e){i=n.getClickedSong((0,r)(this)),(0,r)("#delete-title").html(i[1].title),(0,r)("#delete-artist").html(i[1].artist),(0,r)("#delete-modal").modal("show")}),(0,r)("#confirm-delete").click(function(t){e.child("songs").child(i[0]).set(null),i=[]})}});