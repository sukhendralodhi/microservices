import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { handeGetProducts } from "../services/product.service";


export const productRouter = Router();

productRouter.use(authenticate);

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