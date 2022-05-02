import { NextApiRequest, NextApiResponse } from "next";
import type { ChatMessage } from "@lib/utils/MessageCache";
import { prisma, aliascache } from "@lib/prisma";
import { authenticated } from "@lib/utils/api";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default authenticated(handler)
async function get(req: NextApiRequest, res: NextApiResponse) {
  const page: number = req.query.page as any
  const limit = 1000

  const offset = page * limit;

  const messages = await prisma.cod2_cmdlog.findMany({
    orderBy: {
      messageID: "desc"
    },
    take: limit,
    skip: offset
  })

  const result: ChatMessage[] = messages.map(m => ({
    uid: m.uid,
    messageID: m.messageID,
    command: m.command,
    datetime: new Date(m.datetime).toLocaleString('nl-NL', { timeZone: "CET" }),
    alias: aliascache.get(m.uid)?.sort((a, b) => b.used - a.used)[0]?.alias ?? "Unknown User"
  }))

  res.status(200).json(result);
}