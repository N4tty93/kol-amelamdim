import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import validator from 'validator';
import connect from '../../db/connectMongo';

export default async function handler(req, res) {
  try {
    await connect();
    const saltRounds = 10;
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      res.status(400).send({ status: 'Email is not valid.' });
    }
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
