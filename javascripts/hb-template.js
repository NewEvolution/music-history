define(function(require) {
  return {
    songs: require("hbs!../templates/songs"),
    addSelect: require("hbs!../templates/add-select"),
    genreCheck: require("hbs!../templates/genrecheck"),
    genreRadio: require("hbs!../templates/genreradio"),
    addDropdown: require("hbs!../templates/add-dropdown"),
    genreRadioOther: require("hbs!../templates/genreradioother"),
    genreRadioSingle: require("hbs!../templates/genreradiosingle")
  };
});