import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/client"

const data = {
  repo_url: 'https://github.com/diebraga/next_auth_babylonjs_starter',
  web_image_url: 'https://cdn.pixabay.com/photo/2020/05/29/22/00/field-5236879_960_720.jpg',
  left_image_url: 'https://cdn.pixabay.com/photo/2012/04/13/13/23/disc-32390_960_720.png',
  right_image_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1072&q=80',
  screen_image_url: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1179&q=80'
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data)  
}