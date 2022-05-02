import { authenticated } from "@lib/utils/api";
import { aliascache, prisma} from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatMessage } from "@lib/utils/MessageCache";
import { cod2_bans } from "@prisma/client";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}


export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {
    const bans = await prisma.cod2_bans.findMany()

    for(const ban of bans as Ban[]) {
        const alias = aliascache.get(ban.uid)?.sort((a,b) => b.used - a.used)[0]
        if (alias) {
            ban.banned = alias.alias
        } else {
            ban.banned = "Unknown"
        }
        const admin = aliascache.get(ban.admin_uid)?.sort((a,b) => b.used - a.used)[0]
        if (admin) {
            ban.admin = admin.alias
        } else {
            ban.admin = "Unknown"
        }

        if(ban.reason = "n/a") {
            ban.reason = "No reason given"
        }

        ban.dateString = new Date(ban.date).toLocaleString("nl-NL", {timeZone: "CET"})
        ban.expirationString = new Date(ban.expiration).toLocaleString("nl-NL", {timeZone: "CET"})
    }

    if (bans) {
        return res.json(bans)
    } else {
        return res.status(404).json({bans: []});
    }
}

export interface Ban extends cod2_bans {
    admin: string
    banned: string
    dateString: string
    expirationString: string
}
