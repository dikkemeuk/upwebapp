import { authenticated } from "@lib/utils/api";
import { aliascache, messagecache } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatMessage } from "@lib/utils/MessageCache";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}


export default authenticated(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {
    const messages = messagecache.getMany(500)
    console.log(`Loaded ${messages.length} messages`)
    const ToReturn: ChatMessage[] = [];
    console.log(aliascache?.count())
    for await (const message of messages) {
        const alias = aliascache.get(message.uid)?.sort((a,b) => b.used - a.used)[0]
        if (alias) {
            message.alias = alias.alias
            ToReturn.push(message)
        }
      
      }

    console.log(ToReturn)

    if (ToReturn) {
      return res.status(200).json({
        data: ToReturn,
        message: "Messages",
      });
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }

}
