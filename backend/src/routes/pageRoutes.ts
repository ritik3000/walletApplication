import { Router } from "express";
import {prisma} from "../../prisma";
import signUp from "../controller/userController/signup";
import signIn from "../controller/userController/signIn";
import findBulkUsers from "../controller/userController/findBulkUsers";
import transfer from "../controller/accountController/transfer";
import authMiddleware from "../middlewares/authMiddleware";
import topUp from "../controller/accountController/topUp";
import balance from "../controller/accountController/balance";
import userDetails from "../controller/userController/userDetails";


const router = Router();
router.post("/signup",signUp);
router.post("/signin", signIn);
router.get("/bulkUsers", authMiddleware, findBulkUsers);
router.post("/transfer", authMiddleware, transfer);
router.post("/topUp", authMiddleware, topUp);
router.get("/balance", authMiddleware, balance);
router.get("/userdetails",authMiddleware, userDetails)



export default router;