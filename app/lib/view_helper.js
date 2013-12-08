// Put your handlebars.js helpers here.

Handlebars.registerHelper('pick', function(val, options) {
  return options.hash[val];
});


Handlebars.registerHelper('print', function(val){
  return '{ "type": "' + val.type + '", "performance": "' + val.value + '"}';
});


// parse

/*

var parser = function(){

  var output = [];

  var list = $("#product_list");

  var items = list.find('li');

  for(var i = 0; i < items.length; i++){

    var el = $(items[i]);
    var name = el.find('.product_link').text();
    var desc = el.find('.product_descr').text();

    var price = el.find('.price').text();

    price = price.replace('тг.', '');
    price = price.replace(' ', '');
    price = price.replace(' ', '');

    var image = el.find('.product_img_link img');

    var image_array = image.attr('src').split('/');

    window.open('http://forcecom.kz/upload/images/' + image_array[image_array.length - 1]);

    output.push({
      name : name,
      definition: desc,
      price : price,
      img : '/img/' + image_array[image_array.length - 1]
    });

  }
  console.log(JSON.stringify(output))
}

parser();

*/