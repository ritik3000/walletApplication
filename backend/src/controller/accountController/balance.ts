import { Request, Response } from "express";
import { prisma } from "../../../prisma";

const balance = async(req: Request, res:Response) => {
        try {
            if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
            }
            const userId = req.userId.toString();
            const wallet = await prisma.wallet.findUnique({
            where: { userId: userId }
            })

            return res.status(200).json({
                balance : wallet?.amount.toString()
        
        });
        } catch(error: any) {
        return res.status(500).json({
        error: error.message || "Transfer failed",
        });
    }
}

export default balance;