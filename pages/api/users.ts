import { NextApiRequest, NextApiResponse } from 'next'

// Fake users data
import { users } from './_users_data'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(users)
}