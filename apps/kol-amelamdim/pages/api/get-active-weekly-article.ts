import { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyArticle } from '@kol-amelamdim/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const activeArticle = await WeeklyArticle.findOne({
      isActiveArticle: true,
    });
    if (activeArticle) {
      return res.status(200).json(activeArticle);
    }
  } catch (e) {
    return res.status(404);
  }
}
