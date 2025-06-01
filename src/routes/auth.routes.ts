import { Router } from "express";
import { login } from "../controllers/auth.controller";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";



const router = Router();

router.post("/login", catchAsyncErrors(login));



export default router;