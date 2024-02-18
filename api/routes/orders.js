const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Orders are fetched" });
});

router.post("/", (req, res, next) => {
  res.status(201).json({ message: "Order has been created" });
});

router.get("/:orderId", (req, res, next) => {
  res.json({ message: "Order details", id: req.params.orderId });
});

module.exports = router;
