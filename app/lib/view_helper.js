// Put your handlebars.js helpers here.

Handlebars.registerHelper('pick', function(val, options) {
  return options.hash[val];
});


Handlebars.registerHelper('print', function(val){
  return '{ "type": "' + val.type + '", "performance": "' + val.value + '"}';
});