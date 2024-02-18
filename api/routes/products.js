const express = require("express");

const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Handling GET requests to /products" });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ message: "Handling POST requests to /products" });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(404).json({ message: "Special id found", id: id });
  } else {
    res.json({ message: "not found" });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({ message: "Product Updated" });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({ message: "Product deleted" });
});

module.exports = router;
