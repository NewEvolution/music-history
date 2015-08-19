define(function(require) {
  var templateObj = {};
  templateObj.addSelect = require("hbs!../templates/add-select");
  templateObj.addDropdown = require("hbs!../templates/add-dropdown");
  templateObj.songs = require("hbs!../templates/songs");
  templateObj.genreCheck = require("hbs!../templates/genrecheck");
  templateObj.genreRadio = require("hbs!../templates/genreradio");
  templateObj.genreRadioSingle = require("hbs!../templates/genreradiosingle");
  templateObj.genreRadioOther = require("hbs!../templates/genreradioother");
  return templateObj;
});