const mercadopago = require ('mercadopago');

mercadopago.configure({access_token:'TEST-8704277294641088-051822-f004e153bc3fc18dbced2d4af9298ff8-146468735'});


// Crea un objeto de preferencia
let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
  }).catch(function(error){
    console.log(error);
  });
  