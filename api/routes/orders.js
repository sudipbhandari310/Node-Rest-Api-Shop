const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../model/orderModel");
const Product = require("../model/productModel");
router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then((result) => {
      res.status(201).json({
        count: result.length,
        orders: result.map((result) => {
          return {
            _id: result._id,
            product: result.product,
            quantity: result.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + result._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  // res.status(200).json({ message: "Orders are fetched" });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const order = new Order({
        // _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });

      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order has been stored",
        product: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(201).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then((item) => {
      res.status(200).json({
        message: "Item deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  // res.json({ message: "Order deleted", id: req.params.orderId });
});

module.exports = router;
