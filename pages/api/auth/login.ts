import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { isEmail } from "@lib/utils/misc";
import { secret } from "@lib/utils/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { cod2_players } from "@prisma/client";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const encryptPw = async (str: string) => {
    const res = (await prisma.$queryRawUnsafe(
      `SELECT MD5(CONCAT(MD5('${str}'), 'THISISASTRING'));`
    )) as any;

    const pw = JSON.stringify(res[0]).split(":")[1];
    const fixed = pw.split('"').join("").replace("}", "");

    return `${fixed}`;
  };

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "username and password are required",
    });
  }

  const user = await prisma.cod2_players.findFirst({
    where: { username: username },
  });

  if (!user) {
    return res.status(400).json({
      error: "username or password is incorrect",
    });
  }

  const pw = await encryptPw(password);

  if (pw === user.password) {
    const data = {
      id: user!.id,
      username: user!.username,
      rights: user!.rights,
    };

    const jwt = sign(data, secret, { expiresIn: "6h" });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", jwt, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 21600,
        path: "/",
      })
    );
    res.json({
      message: "Welcome back!",
      data: { username: user!.username, rights: user!.rights, id: user!.id },
    });
  } else {
    res.json({ message: "Ups, something went wrong!" });
  }
}
