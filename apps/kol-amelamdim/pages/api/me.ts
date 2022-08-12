import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { cookies } = req;

    if (cookies.token) {
      res.status(200).send({ success: true });
    }
  } catch (error) {
    res.status(404).send({ status: 'Somthing went wrong.' });
  }
}
