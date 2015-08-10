define(["hbs!../templates/add-select", "hbs!../templates/add-dropdown", "hbs!../templates/songs",
  "hbs!../templates/genrecheck", "hbs!../templates/genreradio", "hbs!../templates/genreradiosingle",
  "hbs!../templates/genreradioother"],
function(addSelectTemplate, addDropdownTemplate, songsTemplate, genreCheckTemplate, genreRadioTemplate,
  genreRadioSingleTemplate, genreRadioOtherTemplate) {
  var templateObj = {};
  templateObj.addSelect = addSelectTemplate;
  templateObj.addDropdown = addDropdownTemplate;
  templateObj.songs = songsTemplate;
  templateObj.genreCheck = genreCheckTemplate;
  templateObj.genreRadio = genreRadioTemplate;
  templateObj.genreRadioSingle = genreRadioSingleTemplate;
  templateObj.genreRadioOther = genreRadioOtherTemplate;
  return templateObj;
});