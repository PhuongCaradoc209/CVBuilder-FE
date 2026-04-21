export const NAV_PATH = {
  HOME: '/',
  DASHBOARD: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGIN_SUCCESS: '/login-success',
  },
  APP: {
    MY_CVS: '/my-cvs',
    CREATE_CV: '/create-cv',
    EDIT_CV: '/edit-cv/:id',
    TEMPLATES: '/templates',
    PROFILE: '/profile',
    SETTINGS: '/settings',
  },
} as const;
