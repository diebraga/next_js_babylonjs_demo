import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  const users = await prisma.user.findMany()
  const user = users.find((user) => user.id === Number(id))

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(user)
      break
    case 'PUT':
      // Update data in your database
      res.status(200).json(user)
      break
    case 'DELETE':
      // Create data in your database
      res.status(200).json(`User ${user.name} deleted successfully!`)
      break  
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
