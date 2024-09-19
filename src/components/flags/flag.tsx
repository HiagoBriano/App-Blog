import FlagEnUS from './flag-en-US'
import FlagPtBR from './flag-pt-BR'

export default function Flag({ code }: { code: string }) {
  switch (code) {
    case 'en-US':
      return <FlagEnUS />
    default:
      return <FlagPtBR />
  }
}
