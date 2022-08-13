import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import connect from '../../db/connectMongo';

export default async function handler(req, res) {
  try {
    await connect();
    const saltRounds = 10;
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json(API_ERRORS.invalidEmailError);
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json(API_ERRORS.registarationEmailExistsError);
    }
    console.log('still here');

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const newUser = await User.create({
        email: email,
        password: hash,
      });

      if (!newUser) {
        return res.status(400).json(API_ERRORS.registarationError);
      }
      return res.status(200).send({ success: true });
    });
  } catch (error) {
    return res.status(404).json(API_ERRORS.registarationError);
  }
}
