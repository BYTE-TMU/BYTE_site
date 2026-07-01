import { useEffect, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode(onActivate: () => void): void {
  const onActivateRef = useRef(onActivate)
  useEffect(() => { onActivateRef.current = onActivate }, [onActivate])

  const indexRef = useRef(0)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === SEQUENCE[indexRef.current]) {
        indexRef.current += 1
        if (indexRef.current === SEQUENCE.length) {
          indexRef.current = 0
          onActivateRef.current()
        }
      } else {
        indexRef.current = e.key === SEQUENCE[0] ? 1 : 0
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}
