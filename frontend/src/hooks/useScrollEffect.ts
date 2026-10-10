import { useEffect, useRef } from 'react'

/**
 * Runs `apply(scrollY, el)` on the returned ref's element on every animation frame while the
 * page scrolls, writing styles straight to the DOM so scrolling never triggers a React render.
 * Does nothing under prefers-reduced-motion. `apply` should be a stable (module-level) function.
 */
export function useScrollEffect<T extends HTMLElement>(apply: (scrollY: number, el: T) => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      apply(window.scrollY, el)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [apply])

  return ref
}
