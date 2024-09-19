export default function LogoIonik({
  width,
  height,
  color = 'black',
}: {
  width: number
  height: number
  color?: string
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 361 65" fill="none">
      <path d="M293 0H309V65H293V0Z" fill={color} />
      <path
        d="M339.3 0L315 30.5L341.3 64.9H360.3L333 30.2L357.6 0H339.3Z"
        fill={color}
      />
      <path
        d="M175.598 0H191.398L222.798 44.3V0H236.698V64.9H220.898L189.498 19.9V64.9H175.598V0Z"
        fill={color}
      />
      <path d="M0 0H15.6V64.9H0V0Z" fill={color} />
      <path d="M257 19H273V65H257V19Z" fill={color} />
      <path d="M257 0H273V15H257V0Z" fill="#00FF85" />
      <rect
        x="43.3477"
        y="7.75"
        width="104.5"
        height="49.5"
        rx="24.75"
        stroke={color}
        stroke-width="15.5"
      />
    </svg>
  )
}
