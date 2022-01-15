import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'GET') {

        const { id } = req.query;
        const parsedId = parseInt(id as string);

        if (parsedId) {
            const user = await prisma?.cod2_players.findUnique({where: {id: parsedId}});

            if(user) {
                return res.status(200).json({
                    data: user,
                    message: 'User found'
                });

            } else {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            
        } else {
            return res.status(404).json({message: "No id provided"});
        }

        
    } else {
        return res.status(405).json({message: "Method not allowed"});
    }
}

export default authenticated(handler);