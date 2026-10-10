interface Props {
  className?: string
}

function Slash() {
  return <span className="text-summit-sky">/</span>
}

export default function SummitDate({ className = '' }: Props) {
  return (
    <div className={`font-summit ${className}`}>
      <p className="text-lg font-light tracking-wide text-white sm:text-xl">
        10<Slash />03–04<Slash />2026
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-light tracking-[0.2em] text-white/70 uppercase">
        <svg aria-hidden className="h-3.5 w-3.5 text-summit-teal" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
        Sears Atrium
      </p>
    </div>
  )
}
