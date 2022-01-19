import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ClassInterface } from "@lib/types";
import { cod2_players } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'GET') {

        return await get(req, res);
        
    } else {
        return res.status(405).json({message: "Method not allowed"});
    }
}

export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

        if(!id) {
            return res.status(400).json({message: "Missing id"});
        }

        const parsedId = parseInt(id as string);

        if (parsedId) {
            const user = await prisma.cod2_players.findUnique({where: {id: parsedId}});

            if(user) {

                const data: ClassInterface[] = []

                for(let i = 1; i <= 8; i++) {
                    const classData = user[`class${i}` as keyof cod2_players] as number;
                    const className = user[`class${i}_name` as keyof cod2_players] as string;
                    data.push({class: classData, className}); 
                }

                return res.status(200).json({
                    data: data,
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

}