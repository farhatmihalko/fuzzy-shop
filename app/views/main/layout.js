var app = require('application');

module.exports = Marionette.Layout.extend({
  template: 'views/main/template',

  regions: {
    menu: '.menu-place',
    content: '.content-place'
  }
});
