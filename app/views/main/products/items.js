var views = {};

views['one-product'] = Marionette.ItemView.extend({
  ui : {
    best : ".js-best"
  },
  template : 'views/main/products/one-product',
  best : function(){
    var _this = this;
    setTimeout(function(){
      _this.ui.best.fadeIn('fast');
    }, 300);
  }
});

views['many-products'] = Marionette.CollectionView.extend({
  counter : 0,
  initialize: function(opts){
    this.priceLevel = opts.price;
  },
  itemView: views['one-product'],

  appendHtml : function(collectionView, itemView, index){
    var pp = parseInt(itemView.model.get('price'));
    var tt = parseInt(this.priceLevel);
    if(pp >= tt){
      this.counter++;
      if(this.counter <= 3){
        itemView.best();
      }
      collectionView.$el.append(itemView.el);
    }
  }
});


module.exports = views;