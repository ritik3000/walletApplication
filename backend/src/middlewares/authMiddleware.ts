import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


const authMiddleware = (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.headers['token'] as string | undefined
        if(!token){
            res.status(404).json({
            message: "token is missing"
            })
            return;
        }
        const secret = process.env.SECRET_KEY;
        if(!secret){
            res.status(500).json({
            message: "SECRET_KEY is not defined."
            })
            return;
        }
        const decoded = jwt.verify(token,secret) as jwt.JwtPayload;
        req.userId = decoded.id;
        next();
    } catch(e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
};

export default authMiddleware;