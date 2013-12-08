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
    value : '#performance-place-value',
    input : '#js-select-change',
    wSelect: '#select-weight-type',
    wInput : '#js-select-weight-kg-type'
  },

  initialize: function(opts){
    this.t_type = opts.type;
  },

  onRender: function(){
    this.weight();
  },

  events : {
    'click #find-something' : 'find',
    'change .select-on-change' : 'weight'
  },

  'find' : function(){
    var _this = this;

    this.ui.performancePlace.hide();

    var list = this.$el.find('select[name="to_parse"]');
    var prepare = {};
    for(var i = 0; i < list.length; i++){
      var el = $(list[i]);
      var val = JSON.parse(el.val().toString());
      prepare[el.attr('data-type')] = val;
    }

    var wType  = this.ui.wSelect.val();
    var wValue = this.ui.wInput.val();

    var result = fuzzy.calculatePerformanceOfComputer(prepare);

    // if we can calculate performance membership
    if(fuzzy.computerTypes[this.t_type] && fuzzy.weightTypes[wType]){

      // performance membership
      var PmemberShip = fuzzy.memberShipValue(result.result, fuzzy.computerTypes[this.t_type]);
      var WmemberShip = fuzzy.memberShipValue(wValue, fuzzy.weightTypes[wType]);

      var min = Math.min(PmemberShip, WmemberShip);

      var _f_types = {
        weight : wType,
        performance : _this.t_type
      };

      var _f_membership = {
        weight : WmemberShip,
        performance : PmemberShip
      };

      _this.process(_f_types, _f_membership);

    }
    return false;
  },

  'weight' : function(ev){
    var sl = 'light';
    if(ev)
      sl = $(ev.currentTarget).val();
    var weight = {
      start : 0,
      end : 0
    };
    if(sl == 'light'){
      weight.start = 1000;
      weight.end = 2000;
    }else if(sl == 'middle'){
      weight.start = 1500;
      weight.end = 3200;
    }else if(sl == 'big'){
      weight.start = 2800;
      weight.end = 5000;
    }

    var rr = Math.floor(Math.random() * (weight.end - weight.start + 1)) + weight.start;

    weight.start /= 1000;
    weight.end /= 1000;
    this.ui.input.text(
      'W can be between ' + weight.start + ' kg and ' + weight.end + ' kg'
    );
    this.ui.wInput.val(rr);
    return false;
  },

  'process' : function(f_types, f_membership){

    // check by using rules
    var priceType     = fuzzy.checkRule(f_types.performance, f_types.weight);
    var minMembership = Math.min(f_membership.performance, f_membership.weight);
    var st = fuzzy.def(priceType, minMembership);
    Backbone.history.navigate('#results/' + Math.floor(st), { trigger: true });
  }
});

module.exports = collection;
