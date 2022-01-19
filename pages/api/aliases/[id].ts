import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ClassInterface } from "@lib/types";
import { cod2_players } from "@prisma/client";
import { stripColors } from "@lib/utils/textColor";

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
            const aliases = await prisma.cod2_aliases.findMany({where: {uid: parsedId}});

            if(aliases) {

               const data = aliases.sort((a, b) => b.used - a.used).map((x) => x.alias = stripColors(x.alias));
                console.log(data)
                return res.status(200).json({
                    data,
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