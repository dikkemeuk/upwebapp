import { authenticated, authenticatedAdmin } from "@lib/utils/api";
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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const parsedId = parseInt(id as string);

  if (parsedId) {
    const aliases = await prisma.cod2_aliases.findMany({
      where: { uid: parsedId },
    });

    if (aliases) {
      const data = aliases
        .sort((a, b) => b.used - a.used)
        .map((x) => (x.alias = coloredText(x.alias)));
      return res.status(200).json({
        data: data.length > 0 ? data : [coloredText("^1[ERROR]: ^7No aliases found")],
        message: "User found",
      });
    } else {
      return res.json({
        data: [coloredText("^7No aliases found")],
        message: "User not found",
      });
    }
  } else {
    return res.status(404).json({ message: "No id provided" });
  }
}
