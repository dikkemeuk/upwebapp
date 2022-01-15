// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/prisma'
import { DurationFormatter } from '@sapphire/time-utilities';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  if(req.method !== 'GET') {
    return res.status(405).end()
  }

  const stats = await prisma.cod2_players.findMany();

  const totalDeaths = stats.reduce((acc, cur) => acc + cur.deaths, 0);
  const totalKills = stats.reduce((acc, cur) => acc + cur.kills, 0);
  const totalAssists = stats.reduce((acc, cur) => acc + cur.assists, 0);
  const totalExperience = stats.reduce((acc, cur) => acc + Number(cur.experience) , 0);

  const formatter = new DurationFormatter()

  const totalTimePlayed = formatter.format(stats.reduce((acc, cur) => acc + Number(cur.time_played), 0) * 1000, 5);

  const data = {
    totalPlayers: Number((await prisma.cod2_players.findMany()).sort((a, b) => b.id - a.id)[0].id),
    totalAliases: await prisma.cod2_aliases.count(),
    totalMessages: await prisma.cod2_cmdlog.count(),
    totalKills,
    totalDeaths,
    totalAssists,
    totalExperience,
    totalTimePlayed
  }

  res.status(200).json(data)
}
