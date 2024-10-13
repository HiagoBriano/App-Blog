import { IDictionary } from './interface'

export const enUS: IDictionary = {
  site: {
    name: 'Ionik - Blog',
    description: 'Model blog',
  },
  navbar: {
    menu: {
      dev: 'Developer',
      administrator: 'Administrator',
      curious: 'Curious',
    },
    user: {
      signIn: 'Sign in',
      profile: 'Profile',
      dashboard: 'Dashboard',
      signOut: 'Sign out',
    },
  },
  auth: {
    login: 'Sign in',
    loginTitle: 'One of us ?',
    loginDescription: 'Log in and join our community',
    loginButton: 'Login',
    register: 'Register',
    registerTitle: 'New here ?',
    registerDescription: 'Sign up and be part of our community',
    registerButton: 'Sign up',
  },
  form: {
    name: 'Name',
    errorName: 'Invalid name',
    email: 'Email',
    errorEmail: 'Invalid email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    errorPassword: 'Password must be at least 6 characters long',
    phone: 'Phone',
    errorPhone: 'Invalid phone',
    save: 'Save',
  },
  error: {
    differentPasswords: 'Passwords must be the same',
    unauthorized: 'Invalid email or password',
    emailAlreadyExists: 'Email already registered',
    error: 'An unexpected error occurred',
  },
  greetings: {
    welcome: 'Welcome to Ionik',
    'Welcome {{name}}': 'Welcome {{name}}',
    '{{nascimento}} {{idade}}': '{{nascimento}} {{idade}}',
  },
}
