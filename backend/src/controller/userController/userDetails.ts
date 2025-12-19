import { Request, Response } from "express";
import { prisma } from "../../../prisma";

const userDetails =  async (req:Request, res: Response) => {
    try {
        if (!req.userId) {
         return res.status(401).json({ error: "Unauthorized" });
        }
        const userId = req.userId.toString();
    
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User doesn't exist");
      }
      
      res.status(200).json({
       firstname: user.firstName,
       lastname: user.lastName,
       email: user.email
      })
    } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal failure while fetching user",
    });
  }
};
export default userDetails;