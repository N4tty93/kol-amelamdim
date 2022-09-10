export enum Category {
  'parashat_shavoa' = 'parashat_shavoa',
  'learning_materials' = 'learning_materials',
  'mivhanim' = 'mivhanim',
  'art_and_activities' = 'art_and_activities',
  'shonot' = 'shonot',
}

export const Categories = [
  {
    URL: 'parashat_shavoa',
    enName: 'Parashat shavoa',
    hebName: 'פרשת השבוע',
  },
  {
    URL: 'learning_materials',
    enName: 'Learning materials',
    hebName: 'חומרי לימוד',
  },
  {
    URL: 'mivhanim',
    enName: 'Mivhanim',
    hebName: 'מבחנים',
  },
  {
    URL: 'art_and_activities',
    enName: 'Art andactivities',
    hebName: 'דפי יצירה ופעילות',
  },
  {
    URL: 'shonot',
    enName: 'Shonot',
    hebName: 'שונות',
  },
];

export const CategoryObject = {
  parashat_shavoa: {
    URL: 'parashat_shavoa',
    enName: 'Parashat shavoa',
    hebName: 'פרשת השבוע',
  },
  learning_materials: {
    URL: 'learning_materials',
    enName: 'Learning materials',
    hebName: 'חומרי לימוד',
  },
  mivhanim: {
    URL: 'mivhanim',
    enName: 'Mivhanim',
    hebName: 'מבחנים',
  },
  art_and_activities: {
    URL: 'art_and_activities',
    enName: 'Art andactivities',
    hebName: 'דפי יצירה ופעילות',
  },
  shonot: {
    URL: 'shonot',
    enName: 'Shonot',
    hebName: 'שונות',
  },
};

export interface IFile {
  key: string;
  category: string;
  name: string;
  size: string;
  author: string;
  type: string;
  URL: string;
  approved: boolean;
}

export const FILE_TYPES_DICTIONARY = {
  all: 'הכל',
  pdf: 'pdf',
  png: 'png',
  jpeg: 'jpeg',
};

export const FileTypes = ['pdf', 'png', 'jpeg'];
