import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.service";


export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
    try {

        const { email, password } = req.body;

        await registerUser(email, password);

        res.status(201).json({
            success: true,
            message: "Registration successfull. Please login to continue!"
        });
    } catch (error) {
        next(error)
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { accessToken } = await loginUser(email, password);

        // commented for now 

        // res.cookie("accessToken", accessToken, {
        //     httpOnly: true,
        //     secure: env.nodeEnv === "production",
        //     sameSite: 'strict',
        //     maxAge: Number(env.jwtTokenMaxAge)
        // });

        res.status(200).json({
            success: true,
            data: { accessToken },
            "message": "Login successfull!"
        });
    } catch (error) {
        next(error);
    }
});