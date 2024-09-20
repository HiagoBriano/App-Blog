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
  menu: IMenu
  welcome: string
  'Welcome {{name}}': string
  '{{nascimento}} {{idade}}': string
}
