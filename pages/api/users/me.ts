import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/client"

export default async function MeHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    res.status(200).json(user)  
  } else res.status(401).json({
    error: 'Unauthorized'
  })
}