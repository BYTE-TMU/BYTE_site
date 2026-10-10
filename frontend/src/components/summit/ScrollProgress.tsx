import { useScrollEffect } from '../../hooks/useScrollEffect'

function setProgress(scrollY: number, el: HTMLDivElement) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  el.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`
}

/** Thin summit-gradient bar fixed to the top of the screen, filling as the page scrolls. */
export default function ScrollProgress() {
  const ref = useScrollEffect<HTMLDivElement>(setProgress)
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-summit-teal via-summit-sky to-summit-violet"
    />
  )
}
