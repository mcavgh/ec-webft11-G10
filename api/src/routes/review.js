const server = require('express').Router();
const { addReview,
        getAllReviews,
        getUserReviews,
        getProductReviews,
        deleteReview,
        updateReview
    } = require('../controllers/review');
const { Order, Product, User } = require("../db");

// CREAR REVIEW |
//--------------------------------
server.post("/", addReview);
server.get("/", getAllReviews);
server.get("/user/:userId", getUserReviews);
server.get("/product/:productId", getProductReviews);
server.delete("/:id", deleteReview);
server.put("/:id", updateReview);



module.exports = server;