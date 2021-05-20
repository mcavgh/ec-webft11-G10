require('dotenv').config();
const { Sequelize,DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');


const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce11`,
        { logging: false, native: false }
      );
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce11`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Product,
  Category,
  User,
  Order,
  Review,
} = sequelize.models;

// PRODUCTS Category

Product.belongsToMany(Category, { through: 'Products_Categories' });
Category.belongsToMany(Product, { through: 'Products_Categories' });

// Product.belongsToMany(Order, { through: 'Products_Cart' });
// Order.belongsToMany(Product, { through: 'Products_Cart'});


// PRODUCTS REVIEWS

Product.hasMany(Review);
Review.belongsTo(Product);

// USERS REVIEWS

User.hasMany(Review);
Review.belongsTo(User);

// PRODUCTS ORDERS
const Order_line= sequelize.define('order_line', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue:1,

  },
});
Product.belongsToMany(Order, { through: Order_line});
Order.belongsToMany(Product, { through: Order_line });

// Order.hasMany(Product, { foreignKey: "productId" });
// Product.belongsTo(Order);

// User.hasMany(Review, { foreignKey: "userId" });
// Review.belongsTo(User)

// user -------order------------product

User.hasMany(Order);
Order.belongsTo(User);

// Cart.belongsToMany(Product, { through: Order });
// Product.belongsToMany(Cart, { through: Order });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};