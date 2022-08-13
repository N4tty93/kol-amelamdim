export const API_ERRORS = {
  uploadFileError: {
    code: 1,
    message: {
      heb: 'אירעה שגיאה בעת העלאת הקובץ אנא נסה שנית',
      en: 'An error occurred while uploading the file. Please try again',
    },
  },
  invalidEmailError: {
    code: 2,
    message: {
      heb: 'הוזן אימייל לא תקני, אנא נסה עם כתובת מייל אחרת',
      en: 'Email is not valid, try again with other email',
    },
  },
  registarationEmailExistsError: {
    code: 3,
    message: {
      heb: 'הוזן מייל שכבר קיים במערכת, אנא נסה עם כתובת מייל אחרת',
      en: 'Email is already exists at the system, try again with other email',
    },
  },
  registarationError: {
    code: 4,
    message: {
      heb: 'אירעה שגיאה בהרשמה למערכת, אנא נסה שנית',
      en: 'An error occurred while registering to the system. Please try again',
    },
  },
  LoginValidationError: {
    code: 5,
    message: {
      heb: 'הוזנו אימייל או סיסמא שגויים, אנא נסה שנית',
      en: 'Incorrect email or password entered, please try again',
    },
  },
  LoginError: {
    code: 6,
    message: {
      heb: 'אירעה שגיאה בהתחברות, אנא נסה שנית',
      en: 'There was an error logging in, please try again',
    },
  },
  GeneralError: {
    code: 7,
    message: {
      heb: 'אירעה שגיאה כללית, אנא רענן',
      en: 'A general error has occurred, please refresh',
    },
  },
};
