import FlagEnUS from './flag-en-US'
import FlagPtBR from './flag-pt-BR'

// Link das bandeiras
// https://nucleoapp.com/svg-flag-icons

export default function Flag({
  code,
  width = 32,
  height = 32,
}: {
  code: string
  width?: number
  height?: number
}) {
  switch (code) {
    case 'en-US':
      return <FlagEnUS width={width} height={height} />
    default:
      return <FlagPtBR width={width} height={height} />
  }
}
