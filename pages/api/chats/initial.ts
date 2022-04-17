import { messagecache } from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatMessage } from "@lib/utils/MessageCache";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return await get(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler
async function get(req: NextApiRequest, res: NextApiResponse) {

  const messages = messagecache.firstChunk
  console.log(`Loaded ${messages.length} messages`)

  const ToReturn: ChatMessage[] = [];
  
  for await (const message of messages) {
    ToReturn.push(message)
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