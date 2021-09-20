import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { getSession } from "next-auth/client"

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  const session = await getSession({ req })
  const { name } = req.body;

  if (session) {
    // Get all users
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    switch (method) {
      case 'GET':
        // Get data from your database
        res.status(200).json(user)
        break
      case 'PUT':
        if (session.user.email === user.email) {
          const userUpdated = await prisma.user.update({
            where: { id: Number(id) },
            data: {
              name: name
            },
          });
          res.status(200).json(userUpdated);
        } else res.status(401).json({ error: 'You can only update yourself' });
        break
      default:
        res.setHeader('Allow', ['GET', ])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else res.status(401).json({
    error: 'Unauthorized'
  })
}
