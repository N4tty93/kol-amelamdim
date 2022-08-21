import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String },
    isActiveArticle: { type: Boolean },
  },
  { collection: 'my-weekly-articles' }
);

export const WeeklyArticle =
  mongoose.models['WeeklyArticleSchema'] ||
  mongoose.model('WeeklyArticleSchema', UserSchema);
