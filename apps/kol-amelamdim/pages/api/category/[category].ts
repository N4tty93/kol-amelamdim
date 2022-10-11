import { File } from '@kol-amelamdim/models';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      const files = await File.find({ category });
      return res.status(200).json({ files });
    } catch (error) {
      return res.status(400).json(API_ERRORS.errorFetchData);
    }
  }
}
