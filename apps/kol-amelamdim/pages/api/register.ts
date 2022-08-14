import { User } from '@kol-amelamdim/models';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { API_ERRORS } from '@kol-amelamdim/api-errors';
import connect from '../../db/connectMongo';

async function hashPassword(password) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export default async function handler(req, res) {
  try {
    await connect();
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json(API_ERRORS.invalidEmailError);
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json(API_ERRORS.registarationEmailExistsError);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json(API_ERRORS.registarationError);
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json(API_ERRORS.registarationError);
  }
}
