import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import cookie from 'cookie';
import validator from 'validator';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
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
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 1440 * 365;

        const joseToken = await new SignJWT({ email: req.body.email })
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .setExpirationTime(exp)
          .setIssuedAt(iat)
          .setNotBefore(iat)
          .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', joseToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          })
        );

        res.status(200).send({ success: true });
      } else {
        return res.status(400).json(API_ERRORS.LoginValidationError);
      }
    } else {
      return res.status(400).json(API_ERRORS.LoginValidationError);
    }
  } catch (error) {
    return res.status(404).json(API_ERRORS.LoginError);
  }
}
