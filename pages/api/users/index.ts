import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (session) {
    const users = await prisma.user.findMany()
    res.status(200).json(users)  
  } else res.status(401).json({
    error: 'Unauthorized'
  })
}