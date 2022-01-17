import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma";
import { DurationFormatter } from "@sapphire/time-utilities";
import { stripColors } from "@lib/utils/textColor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const mems =
    (await prisma.$queryRaw`SELECT rights, id FROM cod2_players WHERE rights > 1 ORDER BY rights DESC`) as MemberResult[];

  const resolveUser = async (uid: number) => {
    const res =
      (await prisma.$queryRaw`SELECT * FROM cod2_aliases WHERE uid = ${uid} ORDER BY used DESC`) as AliasQueryResult[];
    return res[0]?.alias ? stripColors(res[0].alias) : "Unknown User";
  };

  const array: Member[] = [];

  for await (const member of mems) {
    const mem: Member = {
      uid: member.id,
      rights: member.rights,
      name: await resolveUser(member.id),
    };
    array.push(mem);
  }

  res.status(200).json(array);
}

interface MemberResult {
  id: number;
  rights: number;
}

interface AliasQueryResult {
  uid: number;
  alias: string;
  used: number;
}

interface Member {
  uid: number;
  rights: number;
  name: string;
}
