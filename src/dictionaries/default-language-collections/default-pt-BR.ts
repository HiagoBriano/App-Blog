import { defaultLanguageCollections } from './interface'

export const ptBR: defaultLanguageCollections = {
  site: {
    name: 'Ionik - Blog',
    description: 'Blog modelo',
  },
  menu: {
    dev: 'Desenvolvedor',
    administrator: 'Administrador',
    curious: 'Curioso',
    SignIn: 'Login',
  },
  welcome: 'Bem-vindo a Ionik',
  'Welcome {{name}}': 'Bem-vindo {{name}}',
  '{{nascimento}} {{idade}}': '{{nascimento}} {{idade}}',
  auth: {
    login: 'Entrar',
    loginTitle: 'Já é um de nós ?',
    loginDescription: 'Faça login e se junte à nossa comunidade',
    loginButton: 'Entrar',
    register: 'Cadastrar',
    registerTitle: 'Novo aqui ?',
    registerDescription: 'Se inscreva e faça parte da nossa comunidade',
    registerButton: 'Cadastrar',
    form: {
      name: 'Nome',
      email: 'E-mail',
      password: 'Senha',
      confirmPassword: 'Confirme sua senha',
    },
    error: {
      name: 'O nome deve ter no mínimo 3 caracteres',
      email: 'E-mail inválido',
      password: 'A senha deve ter no mínimo 6 caracteres',
      differentPasswords: 'As senhas devem ser iguais',
      unauthorized: 'E-mail ou senha invalida',
      emailAlreadyExists: 'E-mail já cadastrado',
      error: 'Ocorreu um erro inesperado',
    },
  },
}
