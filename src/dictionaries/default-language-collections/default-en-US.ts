import { defaultLanguageCollections } from './interface'

export const enUS: defaultLanguageCollections = {
  site: {
    name: 'Ionik - Blog',
    description: 'Model blog',
  },
  menu: {
    dev: 'Developer',
    administrator: 'Administrator',
    curious: 'Curious',
    SignIn: 'Sign in',
    dashboard: 'Dashboard',
  },
  welcome: 'Welcome to Ionik',
  'Welcome {{name}}': 'Welcome {{name}}',
  '{{nascimento}} {{idade}}': '{{nascimento}} {{idade}}',
  auth: {
    login: 'Sign in',
    loginTitle: 'One of us ?',
    loginDescription: 'Log in and join our community',
    loginButton: 'Login',
    register: 'Register',
    registerTitle: 'New here ?',
    registerDescription: 'Sign up and be part of our community',
    registerButton: 'Sign up',
    form: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    },
    error: {
      name: 'The name must have at least 3 characters',
      email: 'Invalid email',
      password: 'Password must be at least 6 characters long',
      differentPasswords: 'Passwords must be the same',
      unauthorized: 'Invalid email or password',
      emailAlreadyExists: 'Email already registered',
      error: 'An unexpected error occurred',
    },
  },
}
