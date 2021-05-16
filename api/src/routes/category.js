const server = require('express').Router();
const category = require('../controllers/category');
const { searchProductsByCategoryName } = require('../controllers/product');

var p = new Promise(resolve => resolve(true))
const categories = ["helado", "hamburguesas", "pizza", "bebidas", "frutas", "cereales", "carnes", "verduras"];

categories.forEach((categories) => (
    p = p.then(() => (
            category.preload(categories)
        ).catch((err) => console.log(err))
    ))
)
// TRAE TODAS LAS CATEGORIAS |
//----------------------------
server.get('/get', (req, res, next) => {
    category.read()
        .then(r => res.send(r))
        .catch(next);
});
//TRAE LOS PRODUCTOS DE LA CATEGORIA
server.get("/productsbycategories/:categoryName", (req, res, next) => {
    let { categoryName } = req.params;
    return searchProductsByCategoryName(categoryName).then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        res.status(400).json(error);
    });
});
// CREA UNA CATEGORIA |
//---------------------
server.post('/', (req, res, next) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.error()
    }
    category.create(req.body)
        .then(r => res.send(r))
        .catch(next);
})
// MODIFICA UNA CATEGORIA |
//-------------------------
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) {
        return res.error()
    }
    if (!name || !description) {
        return res.error()
    }
    category.update(id, req.body)
        .then(r => res.send(r))
        .catch(next);
})
// ELIMINA UNA CATEGORIA |
//------------------------
server.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.error()
    }
    category.delete(id)
        .then(r => res.send(r))
        .catch(next);
})

module.exports = server;