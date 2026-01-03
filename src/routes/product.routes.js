const express = require("express");
const controller = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.array("images", 5), controller.createProduct);
router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", upload.array("images", 5), controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
