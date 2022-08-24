import mongoose from 'mongoose';

const WeeklyArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String },
    isActiveArticle: { type: Boolean, unique: true },
  },
  { collection: 'my-weekly-articles' }
);

export const WeeklyArticle =
  mongoose.models['WeeklyArticleSchema'] ||
  mongoose.model('WeeklyArticleSchema', WeeklyArticleSchema);
