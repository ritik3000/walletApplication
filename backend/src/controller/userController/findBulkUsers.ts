import { Request, Response } from "express";
import { prisma } from "../../../prisma";

const findBulkUsers = async (req: Request, res: Response) => {
    const filter = req.query.filter?.toString() ?? "";;
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const users = await prisma.user.findMany({
    where: {
    AND: [
        {
            OR: [
                { 
                    firstName: {
                    startsWith: filter,
                    mode: "insensitive"   // optional: case-insensitive
                    }
                },
                { 
                    lastName: {
                    startsWith: filter,
                    mode: "insensitive"   // optional: case-insensitive
                    }
                }
            ]
        },
        {
            NOT: {
                id: req.userId
            }
        },
    ]
    }
    });
    res.status(200).json({ users: users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }))});

}

export default findBulkUsers;