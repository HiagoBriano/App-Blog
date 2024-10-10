export interface IMenu {
  administrator: string
  dev: string
  curious: string
}
export interface defaultLanguageCollections {
  site: {
    name: string
    description: string
  }
  navbar: {
    menu: IMenu
    user: {
      signIn: string
      dashboard: string
      signOut: string
    }
  }
  welcome: string
  'Welcome {{name}}': string
  '{{nascimento}} {{idade}}': string
  auth: {
    login: string
    loginTitle: string
    loginDescription: string
    loginButton: string
    register: string
    registerTitle: string
    registerDescription: string
    registerButton: string
    form: {
      name: string
      email: string
      password: string
      confirmPassword: string
    }
    error: {
      name: string
      email: string
      password: string
      differentPasswords: string
      unauthorized: string
      emailAlreadyExists: string
      error: string
    }
  }
}
