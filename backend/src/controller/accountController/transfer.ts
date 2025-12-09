import { Request, Response } from "express";
import { prisma } from "../../../prisma";


const transfer = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
    }
    const { amount, toUserId } = req.body;

    const fromUserId = req.userId.toString();
    const toUserIdRetrived = toUserId.toString();

      const fromWallet = await prisma.wallet.findUnique({
        where: { userId: fromUserId },
      });

      const toWallet = await prisma.wallet.findUnique({
        where: { userId: toUserIdRetrived },
      });

      if (!fromWallet || !toWallet) {
        throw new Error("One of the wallets does not exist");
      }

      if (fromWallet.amount < amount) {
        throw new Error("Insufficient balance");
      }

    await prisma.$transaction([
       prisma.wallet.update({
        where: { userId: toUserId },
        data: { amount: { increment: amount } },
      }),

       prisma.wallet.update({
        where: { userId: fromUserId },
        data: { amount: { decrement: amount } },
      })
    ]);

    return res.status(200).json({
      message: "Transfer successful",
    });

  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Transfer failed",
    });
  }
};

export default transfer