import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signIn = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Incorrect data"
            })
            return;
        }
        const data = await prisma.user.findUnique({
            where: {email : email}
        })

        if(!data) {
            res.status(400).json({
                message: "User not found"
            })
            return;
        }

        const isMatch = bcrypt.compare(password, data.password);

        if(!isMatch) {
            res.status(400).json({
                "message":"incorrect email & password"
            })
            return;
        }

        const secret = process.env.SECRET_KEY;
        if (!secret) {
        throw new Error("SECRET_KEY is not defined.");
        }
        const token = jwt.sign({ id: data.id }, secret,
        {expiresIn: "1h"}
        );

        res.status(200).json({
        message: "Sign in Successfully",
        token: token
        })
        return;
    } catch(e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
};

export default signIn;