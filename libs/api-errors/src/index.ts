export const API_ERRORS = {
  uploadFileError: {
    code: 1,
    message: {
      heb: 'אירעה שגיאה בעת העלאת הקובץ אנא נסו שנית',
      en: 'An error occurred while uploading the file. Please try again',
    },
  },
  invalidEmailError: {
    code: 2,
    message: {
      heb: 'הוזן אימייל לא תקין, אנא בדקו שהמייל שהוזן תקין ונסו שוב',
      en: 'Email is not valid, try again with other email',
    },
  },
  registrationEmailExistsError: {
    code: 3,
    message: {
      heb: 'הוזן מייל שכבר קיים במערכת, אנא עברו להתחברות או השתמשו במייל אחר.',
      en: 'Email is already exists at the system, try again with other email',
    },
  },
  registrationError: {
    code: 4,
    message: {
      heb: 'אירעה שגיאה בהרשמה למערכת, אנא נסו שנית',
      en: 'An error occurred while registering to the system. Please try again',
    },
  },
  LoginValidationError: {
    code: 5,
    message: {
      heb: 'הוזנו אימייל או סיסמא שגויים, אנא נסו שנית',
      en: 'Incorrect email or password entered, please try again',
    },
  },
  LoginError: {
    code: 6,
    message: {
      heb: 'אירעה שגיאה בהתחברות, אנא נסו שנית',
      en: 'There was an error logging in, please try again',
    },
  },
  GeneralError: {
    code: 7,
    message: {
      heb: 'אירעה שגיאה כללית, אנא נסו שנית',
      en: 'A general error has occurred, please refresh',
    },
  },
  missingFieldsOnUploadFile: {
    code: 8,
    message: {
      heb: 'נא לשלוח קטגוריה וקובץ',
      en: 'Please provide category and file',
    },
  },
};
