var app = require('application');

module.exports = Marionette.Layout.extend({
  template: 'views/templates/result',

  regions: {
    content: '.content-place',
  }
});
