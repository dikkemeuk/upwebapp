import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { stripColors } from "@lib/utils/textColor";



async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {
  
    const { search } = req.body as { search: string };

    const aliases = await prisma.$queryRaw`SELECT * FROM cod2_aliases` as AliasQueryResult[]

    

    const matches = aliases.filter(x => stripColors(x.alias).toLowerCase().includes(search.toLowerCase())).sort((a,b) => b.used - a.used)

    return res.json({message: "Success", matches})

}

export interface AliasQueryResult {
    uid: number
    alias: string
    used: number
} 
