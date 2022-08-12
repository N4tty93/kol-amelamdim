import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import validator from 'validator';
import connect from '../../db/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const user = await User.findOne({ email: req.body.email });

    if (user && validator.isEmail(req.body.email)) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign(
          {
            email: req.body.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '365',
          }
        );
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          })
        );

        res.status(200).send({ success: true });
      } else {
        res.status(400).send({ status: 'Email or password is incorrect.' });
      }
    } else {
      res.status(400).send({ status: 'Email or password is incorrect.' });
    }
  } catch (error) {
    res.status(404).send({ status: 'Somthing went wrong.' });
  }
}
