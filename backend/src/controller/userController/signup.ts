import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma";
import jwt from "jsonwebtoken";

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

    const user = await prisma.user.findUnique({
      where: { email },
        select: {
        id: true,
      },
    })
    if(!user) {
      throw new Error("Created user not found");
    }

    const secret = process.env.SECRET_KEY;
        if (!secret) {
        throw new Error("SECRET_KEY is not defined.");
    }
    const token = jwt.sign({ id: user.id }, secret,
    {expiresIn: "24h"}
    );


    res.status(200).json({
      message: "Successfully Registered",
      token
    });
    return;

  } catch (e) {
    console.error("error", e);
    res.status(500).json({ message: "Server Failure" });
    return;
  }
};

export default signUp;