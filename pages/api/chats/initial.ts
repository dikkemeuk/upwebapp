import { authenticated } from "@lib/utils/api";
import { prisma } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { coloredText } from "@lib/utils/textColor";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {

    const { limit } = req.query as { limit: string };
  
    const messages = await prisma.$queryRaw`SELECT * FROM cod2_cmdlog ORDER BY datetime DESC LIMIT ${limit ? limit : "5000"}` as ChatMessage[]
    const ToReturn: string[] = [];
    
    for (const message of messages) {

        const user = await prisma.cod2_aliases.findFirst({where: {uid: message.uid}, orderBy: { used: "desc" }, take: 1});
        const name = coloredText(user?.alias || "Could not find user");

        const messageText = `<div key={${message.messageID}} class="rounded-lg px-1 py-2 border-b border-white">${coloredText(name)} ${coloredText(`^3[@${message.uid}]`)} ${coloredText(`^1${new Date(message.datetime).toLocaleString()}`)} : ${coloredText(message.content)} </div>`;
        ToReturn.push(messageText);
    }
    

    if (messages) {
      return res.status(200).json({
        data: ToReturn,
        highestID: messages[0].messageID,
        lowestID: messages[messages.length - 1].messageID,
        message: "Messages",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }

}

interface ChatMessage {
    uid: number
    content: string
    datetime: string
    alias?: string
    messageID: number
}
