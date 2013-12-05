var collection = {};

var fuzzy = require('lib/fuzzy');

collection['menu-li'] = Marionette.ItemView.extend({
  template: 'views/main/one',
  tagName: 'a',
  className: 'list-group-item step-1-menu'
});

collection['menu'] = Marionette.CollectionView.extend({
  itemView: collection['menu-li'],
  tagName: 'div',
  className: 'list-group wizard-menu',
  initialize: function(opts){
    this.type = opts.type;
  },
  appendHtml : function(collectionView, itemView, index){
    collectionView.$el.append(itemView.el);
    if(itemView.model.get('root') == this.type)
      itemView.$el.addClass('active')
    itemView.$el.attr('href', '#show/' + itemView.model.get('root'));
  }
});

collection['content-params'] = Marionette.ItemView.extend({
  template: 'views/main/params',

  ui : {
    performancePlace : '.performance-place',
    value : '#performance-place-value'
  },

  initialize: function(opts){
    this.t_type = opts.type;
  },

  events : {
    'click #find-something' : 'find'
  },

  'find' : function(){
    this.ui.performancePlace.hide();

    var list = this.$el.find('select[name="to_parse"]');
    var prepare = {};
    for(var i = 0; i < list.length; i++){
      var el = $(list[i]);
      var val = JSON.parse(el.val().toString());
      prepare[el.attr('data-type')] = val;
    }

    var result = fuzzy.calculatePerformanceOfComputer(prepare);

    // if we can calculate performance membership
    if(fuzzy.computerTypes[this.t_type]){
      // performance membership
      var memberShip = fuzzy.memberShipValue(result.result, fuzzy.computerTypes[this.t_type]);
    }

    this.ui.value.text(result.result);
    this.ui.performancePlace.fadeIn('slow');

    return false;
  }
});

module.exports = collection;
