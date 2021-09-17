import { NextApiRequest, NextApiResponse } from 'next'

// Fake users data
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}