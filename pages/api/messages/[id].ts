import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { cod2_cmdlog } from "@prisma/client";
import { stripColors } from "@lib/utils/textColor";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const parsedId = parseInt(id as string);

  if (parsedId) {
    const messages = await prisma.cod2_cmdlog.findMany({
      where: { uid: parsedId },
    });

    const user = await prisma.cod2_aliases.findMany({where: {uid: parsedId}});

    if(!user || !user[0]) {
      return res.json({
        message: "User not found",
      });
    }

    const mostUsed = user.sort((a, b) => b.used - a.used)[0].alias
    

    if (messages) {
      return res.status(200).json({
        data: messages.map((x) => Object.assign(x, {name: stripColors(mostUsed)})).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()),
        message: "User found",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } else {
    return res.status(404).json({ message: "No id provided" });
  }
}
