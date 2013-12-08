var model = Backbone.Model.extend({});


var collection = Backbone.Collection.extend({
  model : model,
  comparator : 'price',

  method : function(){
    this.models =  _.sortBy( this.models, function(model){ return parseInt(model.get('price'));} );
  }
});

module.exports = collection;