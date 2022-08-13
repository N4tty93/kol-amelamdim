import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { API_ERRORS } from '@kol-amelamdim/api-errors';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      })
    );
    res.status(200).send({ success: true });
  } catch (error) {
    return res.status(404).json(API_ERRORS.GeneralError);
  }
};
