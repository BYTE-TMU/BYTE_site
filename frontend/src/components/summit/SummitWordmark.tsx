interface Props {
  className?: string
}

/** "TMU" in the summit gradient + "CyberSummit" in white. Size it with a text-* class. */
export default function SummitWordmark({ className = '' }: Props) {
  return (
    <span className={`font-summit tracking-tight ${className}`}>
      <span className="summit-gradient-text font-bold">TMU</span>
      <span className="font-light text-white">CyberSummit</span>
    </span>
  )
}
