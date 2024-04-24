import authRoutes from "./authRoutes.js"
import express from "express"
import userRoutes from "./userRoute.js"
import postRoute from "./postRoutes.js";

const router = express.Router();

router.use(`/auth`, authRoutes)
router.use(`/users`, userRoutes)
router.use(`/posts`, postRoute);

export default router