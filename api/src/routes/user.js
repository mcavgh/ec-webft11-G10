const server = require("express").Router();
const { Order, Product, User } = require("../db");


// TRAE UN USUARIO POR ID |
//------------------------
server.get("/users", (req, res) => {
  
  User.findAll()
    .then((user) => res.send(user ? user : "no hay usuarios"))
    .catch((err) => res.send(err));
});


// TRAE UN USUARIO POR ID |
//------------------------
server.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => res.send(user ? user : "el usuario no existe"))
    .catch((err) => res.send(err));
});

// TRAE UN USUARIO POR EMAIL |

server.get("/email/:email", (req, res) => {
  const { email } = req.params;
  User.findOne({ where: { email: email } })
    .then((user) => res.send(user ? user : "el usuario no existe"))
    .catch((err) => res.send("errorrrrrrrrrrrrrrrrrrrrrrrrr"));
});
// CREAR USUARIO |
//----------------
server.post("/register", (req, res) => {
  const { name, surname, email, password, photoURL, access } = req.body;

  User.create({
    name: name,
    surname: surname,
    email: email,
    password: password,
    photoURL: photoURL,
    access: access,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.send(err));
});


// MODIFICA EL ACCESS DEL USUARIO |
//----------------

// server.put('/:id/usuario', (req, res) => {

//   const { id } = req.params;
//   const { access } = req.body;
//   console.log("=======================>",id)
//   console.log("=======================>",access)
//   return User.Update({ where: { id: id } })
//     .then((user) => {
//       user.access = access;
//       User.save();
//       return res.status(200).json({
//         message: `El usuario se a modificado`,
//         data: user,
//       });
//     })
//     .catch((err) => {
//       return res.status(400).json({
//         message: 'Error en el proceso de modificacion del user',
//         data: err,
//       });
//     });
// });


server.put('/:id/usuario/admin', (req, res, next) => {
  const { id } = req.params;

  User.update(
    {
      access: "Admin",
    },
    {
      where: { id},
    }
  )
      .then(r => res.send(r))
      .catch(next);
})



server.put('/:id/usuario/user', (req, res, next) => {
  const { id } = req.params;

  User.update(
    {
      access: "User",
    },
    {
      where: { id},
    }
  )
      .then(r => res.send(r))
      .catch(next);
})

//////////////// DELETE USER ////////////////
server.delete('/:id', (req, res) => {
  const id = req.params.id

  User.destroy({
    
    where: { id: id },
  })
    .then((user) => {
      if (user) res.send("user eliminated");
      
      else res.send("user not found"); 
    })
    .catch((err) => res.send("an unexpected error occurred"));
})


// // MODIFICA UN PRODUCTO |
// //-----------------------
// server.get("/:id/usuario", (req, res) => {

//   const id = req.params.id;
//   Product.findOne({ where: { id } })
//     .then((product) => {
      
//         product.update({
//           access:"Admin"

//         })
//         res.send(product);
      
//     })
//     .catch((error) => {
//       res.status(400).json(error);
//     });
// });

module.exports = server;
