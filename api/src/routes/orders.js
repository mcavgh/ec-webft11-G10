const server = require("express").Router();
const orders = require('../controllers/orders');
const { Order, Product, User } = require("../db");
server.post("/ols", (req, res) => {
  const { price, quantity, state, userId, address, paymentMethod } = req.body
  Order.create({
    price: price,
    quantity: quantity,
    state: state,
    address: address,
    paymentMethod: paymentMethod,
    userId: userId
  })
    .then((order) => {
      res.send(order);
    })
    .catch((err) => res.send(err));
});

// VER ITEMS DEL USUARIO |
//------------------------
server.get("/userid/:id", (req, res) => {
  //Muestra todos los items del carrito
  const { id } = req.params;
  console.log("iufhgsdhf", id)
  Order.findAll({
    include: {
      model: Product,
    },
    where: { userId: parseInt(id) },
  }) //busca todos los items
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
// TRAE TODAS LAS ORDENES |
//-------------------------
server.get("/", (req, res) => {

  Order.findOne({ include: [{ model: Product }, { model: User }] })
    .then((order) => {
      res.send(order);
    })
    .catch((err) => res.send(err));
});
// TRAE UNA ORDEN POR ID |
//------------------------
server.get("/:id", (req, res) => {
  const { id } = req.params;
  Order.findAll({
    where: { id: id }, include: [{ model: Product }, { model: User }]
  })
    .then((order) =>
      res.send(
        order ? order : "la orden no existe"
      )
    )
    .catch((err) => res.send(err));

});
// server.get("/:id", (req, res) => {
//   const { id } = req.params;
//   Order.findByPk(id)
//     .then((order) =>
//       res.send(
//         order? order: "la orden no existe" 
//       )
//     )
//     .catch((err) => res.send(err));

// });

// TRAE ORDENES POR UserID |
//----------------------------
server.get('/user/:id', (req, res) => {
  const { id } = req.params

  User.findOne({ where: { id } })
    .then(user => {
      user.getOrders({ include: [{ model: Product }, { model: User }] })
        .then(
          products => res.send(products),
          err => res.send(err)
        )
    })
    .catch(err => res.send(err))
})

// MODIFICA UNA ORDEN POR ID |
//----------------------------
server.put("/:id/modifica", (req, res) => {

  const { id } = req.params;
  const { price, quantity, state, address } = req.body;

  Order.update(
    {
      price: price,
      quantity: quantity,
      state: state,
      address: address
    },
    {
      where: { id: id },
    }
  )
    .then((update) =>
      res.send(
        update[0] ? update[0] : "la orden no existe"
      )
    )
    .catch((err) => console.log(err)


    );
});

module.exports = server;
