import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('User passed the middleware and he authenticated admin');
  // TODO: Implement weekly post logic below ...
  res.send('To be continued...');
}
