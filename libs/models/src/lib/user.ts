import mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
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
  },
  { collection: 'my-users' }
);

export const User: mongoose.Model<IUser> =
  mongoose.models['UserSchema'] || mongoose.model('UserSchema', UserSchema);
