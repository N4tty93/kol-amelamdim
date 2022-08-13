import { NextApiRequest, NextApiResponse } from 'next';
import { API_ERRORS } from '@kol-amelamdim/api-errors';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { cookies } = req;

    if (cookies.token) {
      res.status(200).send({ success: true });
    }
    res.status(200).send({ success: false });
  } catch (error) {
    return res.status(404).json(API_ERRORS.GeneralError);
  }
}
