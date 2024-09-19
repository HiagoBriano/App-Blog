export interface IMenu {
  Services: string
  Process: string
  Portfolio: string
  Testimonials: string
  Contact: string
}
export interface defaultLanguageCollections {
  site: {
    name: string
    description: string
  }
  menu: IMenu
  'Welcome {{name}}': string
  '{{nascimento}} {{idade}}': string
}
