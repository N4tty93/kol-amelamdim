import { NextApiRequest, NextApiResponse } from 'next';
import { jwtVerify } from 'jose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cookies } = req;
    const { payload } = await jwtVerify(
      cookies.token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );
    if (payload) {
      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: false });
  } catch (error) {
    return res.status(200).json({ success: false });
  }
}
