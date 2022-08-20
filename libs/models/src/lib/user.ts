import mongoose from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  admin: boolean;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
    },
  },
  { collection: 'my-users' }
);

export const User: mongoose.Model<IUser> =
  mongoose.models['UserSchema'] || mongoose.model('UserSchema', UserSchema);
