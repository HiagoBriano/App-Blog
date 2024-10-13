export interface IMenu {
  administrator: string
  dev: string
  curious: string
}

export interface IDictionary {
  site: {
    name: string
    description: string
  }
  navbar: {
    menu: IMenu
    user: {
      signIn: string
      profile: string
      dashboard: string
      signOut: string
    }
  }
  auth: {
    login: string
    loginTitle: string
    loginDescription: string
    loginButton: string
    register: string
    registerTitle: string
    registerDescription: string
    registerButton: string
  }
  form: {
    name: string
    errorName: string
    email: string
    errorEmail: string
    password: string
    confirmPassword: string
    errorPassword: string
    phone: string
    errorPhone: string
    save: string
  }
  error: {
    differentPasswords: string
    unauthorized: string
    emailAlreadyExists: string
    error: string
  }
  greetings: {
    welcome: string
    'Welcome {{name}}': string
    '{{nascimento}} {{idade}}': string
  }
}
