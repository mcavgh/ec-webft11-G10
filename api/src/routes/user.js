const server = require("express").Router();
const { Order, Product, User } = require("../db");

// TRAE UN USUARIO POR ID |
//------------------------
server.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) =>
      res.send(
        user ? user : "el usuario no existe"
      )
    )
    .catch((err) => res.send(err));
});

// TRAE UN USUARIO POR EMAIL |

server.get("/email/:email", (req, res) => {
  const { email } = req.params;
  User.findOne({ where: { email: email } })
    .then((user) =>
      res.send(
        user ? user : "el usuario no existe"
      )
    )
    .catch((err) => res.send(err));
});
// CREAR USUARIO |
//----------------
server.post("/register", (req, res) => {
  const { name, surname, email, password, access } = req.body;

  User.create({

    name: name,
    surname: surname,
    email: email,
    password: password,
    access: access,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.send(err));
});

module.exports = server;
