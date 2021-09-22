import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM, // The "from" address that you want to use
    })
  ],

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  jwt: {
    secret: process.env.JWT_SECRET, //use a random secret token here
    encryption: true
  },

  debug: Boolean(process.env.DEBUG),
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
};
