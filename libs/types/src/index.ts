export enum Category {
  'parashat_shavoa' = 'parashat_shavoa',
  'learning_materials' = 'learning_materials',
  'mivhanim' = 'mivhanim',
  'art_and_activities' = 'art_and_activities',
  'shonot' = 'shonot',
}

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
