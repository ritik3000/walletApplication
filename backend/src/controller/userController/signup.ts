import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma";

const signUp = async (req: Request, res: Response) => {
  try{
    const {firstName,lastName,email,password} = req.body;
    
    if(!firstName || !lastName || !email || !password){
      res.status(400).json({
        error: "Missing required fields"
      })
      return;
    }

     const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
       res.status(409).json({ error: 'Email already in use' })
       return;
    }

    const hashPassword = await bcrypt.hash(password,5);

    await prisma.$transaction(async (tx) => {

      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashPassword,
        },
      });

      await tx.wallet.create({
        data: {
          userId: user.id,
          amount: 10000,
        },
      });

    });

    res.status(200).json({
      message: "Successfully Registered",
    });
    return;

  } catch (e) {
    console.error("error", e);
    res.status(500).json({ message: "Server Failure" });
    return;
  }
};

export default signUp;