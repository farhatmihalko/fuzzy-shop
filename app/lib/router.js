var app = require('application');

var specification = require('lib/specification');

var mnOne = Backbone.Model.extend({});
var mn = Backbone.Collection.extend({
  model: mnOne
});

mn = new mn([
  {
    root: 'budget',
    name : '1. I need a budget computer!',
    definition: 'Just to working with simple applications.'
  },
  {
    root: 'office',
    name : '2. I need a office computer!',
    definition: 'I want to work with office programs like: MS WORD, MS Excel etc.'
  },
  {
    root: 'multimedia',
    name : '3. I need a multimedia center!',
    definition: 'I want to collect films, music and play it.'
  },
  {
    root: 'game',
    name : '4. I need a game center!',
    definition: 'I love to play different games!'
  },
  {
    root: 'super',
    name : '5. I need a super performance computer!',
    definition: 'I working with photoshop and video rendering.'
  }
]);

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'show/(:type)' : 'show',
    'results/(:price)' : 'result-page',
    'about' : 'about'
  },

	home: function() {
	 Backbone.history.navigate('#show/budget', { trigger: true });
	},

  show: function(type){
    var layout = require('views/main/layout');
    var menu = require('views/main/items');
    layout = new layout();
    app.layout.content.show(layout);

    var mst = new menu['menu']({
      collection: mn,
      type: type
    });

    var pp = require('lib/specification');
    var s_model = require('models/model');
    s_model = new s_model(pp[type]);
    var content = new menu['content-params']({
      model: s_model,
      type : type
    });

    layout.menu.show(mst);
    layout.content.show(content);
  },

  'result-page' : function(price){
    var result   = require('views/main/result');
    var products = require('lib/store');

    result = new result();
    app.layout.content.show(result);

    var items = require('views/main/products/items');

    products.method();

    var items_r = new items['many-products']({ collection: products, price: price });

    result.content.show(items_r);
  },
  'about' : function(){
    var about = Marionette.ItemView.extend({
      template: 'views/templates/about'
    });
    about = new about();
    app.layout.content.show(about);
  }
});
