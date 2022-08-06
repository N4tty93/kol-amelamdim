import {User} from '@kol-amelamdim/models';

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
