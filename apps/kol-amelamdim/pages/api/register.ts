import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import connect from '../../db/connectMongo';

export default function handler(req, res) {
  connect();
  try {
    const saltRounds = 10;
    const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const newUser = await User.create({
        email: email,
        password: hash,
      });

      if (!newUser) {
        return res.send({ code: 'User not created' });
      }
      res.status(200).send({ success: true });
    });
  } catch (error) {
    res.status(400).send({ status: 'Not able to create user.' });
  }
}
