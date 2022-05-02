import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { GenericStats } from "@lib/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'GET') {

        return await get(req, res);
        
    } else {
        return res.status(405).json({message: "Method not allowed"});
    }
}

export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse<{data?: GenericStats, message: string}>) {
    const { id } = req.query;

        if(!id) {
            return res.status(400).json({message: "Missing id"});
        }

        const parsedId = parseInt(id as string);

        if (parsedId) {
            const user = await prisma.cod2_players.findUnique({where: {id: parsedId}});

            if(user) {

                

                return res.status(200).json({
                    data: {
                        id: user.id,
                        rights: user.rights,
                        experience: user.experience ?? 0,
                        kills: user.kills,
                        deaths: user.deaths,
                        KDRatio: (user.kills / user.deaths).toFixed(3),
                        assists: user.assists,
                        rank: user.rank,
                        killstreak: user.killstreak ?? 0,
                        melee_kills: user.melee_kills,
                        headshots: user.headshots,
                        prestige: user.prestige,
                        zom_kills: user.zom_kills,
                        isRegistered: user.username !== null,
                    },
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