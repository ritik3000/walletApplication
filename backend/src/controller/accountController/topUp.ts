import { Request, Response } from "express";
import { prisma } from "../../../prisma";

const topUp =  async (req:Request, res: Response) => {
    try {
        if (!req.userId) {
         return res.status(401).json({ error: "Unauthorized" });
        }
        const userId = req.userId.toString();
        const {amount} = req.body;
    
      const wallet = await prisma.wallet.findUnique({
        where: { userId: userId },
      });

      if (!wallet) {
        throw new Error("Wallet doesn't exist");
      }


      await prisma.wallet.update({
        where: { userId: userId },
        data: { amount: { increment: amount } },
      });
      
      res.status(200).json({
        message: "Wallet successfully topped up"
      })
    } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Transfer failed",
    });
  }
};
export default topUp;