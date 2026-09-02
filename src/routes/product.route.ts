import { Router } from "express";
// import { authenticate } from "../middlewares/auth.middleware";
import { getProductViews, handeGetProducts, handleGetProduct, handleProductUpdate } from "../services/product.service";


export const productRouter = Router();

// productRouter.use(authenticate);

productRouter.get("/", async function (req, res, next) {
    try {
        // const query = req.query.search;
        // console.log(search)
        const products = await handeGetProducts(req.query);

        res.status(200).json({
            message: "Product fetched",
            success: true,
            data: products
        });
    } catch (error) {
        next(error)
    }
});

productRouter.get("/:id", async function (req, res, next) {
    try {
        const pId = req.params.id;

        const product = await handleGetProduct(pId);

        res.status(200).json({
            message: "Product fetched",
            success: true,
            data: product
        });

    } catch (error) {
        next(error);
    }
});

productRouter.put("/:id", async function (req, res, next) {
    try {
        const pId = req.params.id;
        const data = req.body;
        const product = await handleProductUpdate(pId, data);

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
});

productRouter.get("/:id/views", async function (req, res, next) {
    try {
        const id = req.params.id;
        const views = await getProductViews(id);

        // console.log(views);
        // console.log(id);

        res.status(200).json({
            message: "OK",
            success: true,
            data: {
                productId: id,
                views: views
            }
        });

    } catch (error) {
        next(error);
    }
})