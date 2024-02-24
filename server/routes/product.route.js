import express from "express";
import productCtrl from "../controllers/product.controller.js";

const router = express.Router();

router.route("/api/products").get(productCtrl.list);
router.route("/api/products").post(productCtrl.create);

router
  .route("/api/products/:productID")
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(productCtrl.remove);
router.param("productID", productCtrl.productByID);

router.route("/api/products").delete(productCtrl.removeAll);

export default router;
