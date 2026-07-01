import { useEffect, useRef, useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COLS = 20
const ROWS = 20
const INITIAL_SPEED = 150
const MIN_SPEED = 80
const SPEED_STEP = 10
const FOOD_PER_LEVEL = 5

const COLOR_ACCENT = '#4ade80'
const COLOR_HEAD = '#86efac'
const COLOR_BG = '#000000'
const COLOR_GRID = '#0d0d0d'
const COLOR_MUTED = '#444444'
const COLOR_WHITE = '#ffffff'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Point = { x: number; y: number }

interface GameState {
  snake: Point[]
  direction: Direction
  nextDirection: Direction
  food: Point
  gameOver: boolean
  speed: number
  foodCount: number
}

interface Props {
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function getCell(): number {
  return Math.floor(Math.min(400, window.innerWidth - 64) / COLS)
}

function randomFood(snake: Point[]): Point {
  const occupied = new Set(snake.map(p => `${p.x},${p.y}`))
  let p: Point
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (occupied.has(`${p.x},${p.y}`))
  return p
}

function makeInitialState(): GameState {
  const snake = [{ x: 10, y: 10 }]
  return {
    snake,
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    food: randomFood(snake),
    gameOver: false,
    speed: INITIAL_SPEED,
    foodCount: 0,
  }
}

function opposite(d: Direction): Direction {
  if (d === 'UP') return 'DOWN'
  if (d === 'DOWN') return 'UP'
  if (d === 'LEFT') return 'RIGHT'
  return 'LEFT'
}

// ---------------------------------------------------------------------------
// Canvas draw functions
// ---------------------------------------------------------------------------

function drawTutorial(ctx: CanvasRenderingContext2D, cell: number, isTouchDevice: boolean) {
  const w = COLS * cell
  const h = ROWS * cell

  ctx.fillStyle = COLOR_BG
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = COLOR_GRID
  ctx.lineWidth = 0.5
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath(); ctx.moveTo(x * cell, 0); ctx.lineTo(x * cell, h); ctx.stroke()
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * cell); ctx.lineTo(w, y * cell); ctx.stroke()
  }

  const cx = w / 2
  ctx.textAlign = 'center'

  ctx.shadowBlur = 16
  ctx.shadowColor = COLOR_ACCENT
  ctx.fillStyle = COLOR_ACCENT
  ctx.font = `bold ${cell * 1.4}px monospace`
  ctx.fillText('BYTE.EXE', cx, h * 0.22)

  ctx.shadowBlur = 0
  ctx.fillStyle = COLOR_WHITE
  ctx.font = `${cell * 0.7}px monospace`
  ctx.fillText('FEED THE BYTE', cx, h * 0.33)

  ctx.strokeStyle = COLOR_MUTED
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(w * 0.2, h * 0.39)
  ctx.lineTo(w * 0.8, h * 0.39)
  ctx.stroke()

  ctx.fillStyle = COLOR_MUTED
  ctx.font = `${cell * 0.58}px monospace`
  if (isTouchDevice) {
    ctx.fillText('SWIPE TO MOVE', cx, h * 0.49)
  } else {
    ctx.fillText('[ ↑ ↓ ← → ]  TO MOVE', cx, h * 0.49)
  }
  ctx.fillText('EAT BITS TO GROW', cx, h * 0.60)
  ctx.fillText('AVOID WALLS & YOURSELF', cx, h * 0.70)

  ctx.shadowBlur = 8
  ctx.shadowColor = COLOR_ACCENT
  ctx.fillStyle = COLOR_ACCENT
  ctx.font = `bold ${cell * 0.62}px monospace`
  ctx.fillText(isTouchDevice ? '[ TAP ] TO START' : '[ SPACE ] TO START', cx, h * 0.84)
  ctx.shadowBlur = 0
}

function drawFrame(ctx: CanvasRenderingContext2D, g: GameState, cell: number) {
  const w = COLS * cell
  const h = ROWS * cell

  ctx.fillStyle = COLOR_BG
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = COLOR_GRID
  ctx.lineWidth = 0.5
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath(); ctx.moveTo(x * cell, 0); ctx.lineTo(x * cell, h); ctx.stroke()
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * cell); ctx.lineTo(w, y * cell); ctx.stroke()
  }

  const f = g.food
  ctx.save()
  ctx.shadowBlur = 14
  ctx.shadowColor = COLOR_ACCENT
  ctx.fillStyle = COLOR_ACCENT
  ctx.fillRect(f.x * cell + 2, f.y * cell + 2, cell - 4, cell - 4)
  ctx.shadowBlur = 0
  ctx.fillStyle = COLOR_WHITE
  ctx.fillRect(f.x * cell + 3, f.y * cell + 3, Math.max(2, cell * 0.2), Math.max(2, cell * 0.2))
  ctx.restore()

  ctx.fillStyle = COLOR_ACCENT
  for (let i = g.snake.length - 1; i >= 1; i--) {
    const s = g.snake[i]
    ctx.fillRect(s.x * cell + 1, s.y * cell + 1, cell - 2, cell - 2)
  }

  const head = g.snake[0]
  ctx.fillStyle = COLOR_HEAD
  ctx.fillRect(head.x * cell, head.y * cell, cell, cell)

  if (g.gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)'
    ctx.fillRect(0, 0, w, h)

    ctx.textAlign = 'center'
    ctx.shadowBlur = 10
    ctx.shadowColor = '#ef4444'
    ctx.fillStyle = '#ef4444'
    ctx.font = `bold ${cell * 1.1}px monospace`
    ctx.fillText('PROCESS TERMINATED', w / 2, h * 0.38)

    ctx.shadowBlur = 0
    ctx.fillStyle = COLOR_WHITE
    ctx.font = `${cell * 0.75}px monospace`
    ctx.fillText(`BYTES CONSUMED: ${g.snake.length - 1}`, w / 2, h * 0.52)

    ctx.fillStyle = COLOR_MUTED
    ctx.font = `${cell * 0.6}px monospace`
    ctx.fillText('[ R ] RESTART', w / 2, h * 0.66)
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BYTESnake({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<GameState>(makeInitialState())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCloseRef = useRef(onClose)
  const gameStartedRef = useRef(false)

  const [score, setScore] = useState(0)
  const [generation, setGeneration] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [cell, setCell] = useState(getCell)
  const isTouchDevice = 'ontouchstart' in window

  useEffect(() => { onCloseRef.current = onClose }, [onClose])
  // Keep ref in sync so touch handlers can read current value without stale closure
  useEffect(() => { gameStartedRef.current = gameStarted }, [gameStarted])

  // Recalculate cell size on window resize
  useEffect(() => {
    function onResize() { setCell(getCell()) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Redraw when cell size changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = COLS * cell
    canvas.height = ROWS * cell
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (!gameStarted) {
      drawTutorial(ctx, cell, isTouchDevice)
    } else {
      drawFrame(ctx, gameRef.current, cell)
    }
  }, [cell, gameStarted, isTouchDevice])

  const initGame = useCallback(() => {
    gameRef.current = makeInitialState()
  }, [])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!gameStarted) {
      drawTutorial(ctx, cell, isTouchDevice)
      return
    }

    drawFrame(ctx, gameRef.current, cell)

    function tick() {
      const g = gameRef.current
      if (g.gameOver) { drawFrame(ctx!, g, cell); return }

      if (g.nextDirection !== opposite(g.direction)) {
        g.direction = g.nextDirection
      }

      const head = g.snake[0]
      const newHead: Point = { x: head.x, y: head.y }
      if (g.direction === 'UP')    newHead.y -= 1
      if (g.direction === 'DOWN')  newHead.y += 1
      if (g.direction === 'LEFT')  newHead.x -= 1
      if (g.direction === 'RIGHT') newHead.x += 1

      if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
        g.gameOver = true; drawFrame(ctx!, g, cell); return
      }
      if (g.snake.some(p => p.x === newHead.x && p.y === newHead.y)) {
        g.gameOver = true; drawFrame(ctx!, g, cell); return
      }

      const ateFood = newHead.x === g.food.x && newHead.y === g.food.y
      g.snake = [newHead, ...g.snake]
      if (!ateFood) g.snake.pop()

      if (ateFood) {
        g.food = randomFood(g.snake)
        g.foodCount += 1
        setScore(g.snake.length - 1)
        if (g.foodCount % FOOD_PER_LEVEL === 0) {
          const newSpeed = Math.max(MIN_SPEED, g.speed - SPEED_STEP)
          if (newSpeed !== g.speed) {
            g.speed = newSpeed
            if (intervalRef.current) clearInterval(intervalRef.current)
            intervalRef.current = setInterval(tick, newSpeed)
          }
        }
      }

      drawFrame(ctx!, g, cell)
    }

    intervalRef.current = setInterval(tick, gameRef.current.speed)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation, gameStarted])

  const handleDirection = useCallback((d: Direction) => {
    const g = gameRef.current
    if (g.gameOver) return
    if (d !== opposite(g.direction)) g.nextDirection = d
  }, [])

  // Keyboard handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp':    e.preventDefault(); handleDirection('UP');    break
        case 'ArrowDown':  e.preventDefault(); handleDirection('DOWN');  break
        case 'ArrowLeft':  e.preventDefault(); handleDirection('LEFT');  break
        case 'ArrowRight': e.preventDefault(); handleDirection('RIGHT'); break
        case ' ':
          e.preventDefault()
          setGameStarted(true)
          break
        case 'r': case 'R':
          initGame(); setScore(0); setGameStarted(false); setGeneration(g => g + 1)
          break
        case 'Escape':
          onCloseRef.current()
          break
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleDirection, initGame])

  // Imperative touch listeners with { passive: false } so preventDefault works
  // and the page doesn't scroll during swipes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let touchStart: { x: number; y: number } | null = null

    function onTouchStart(e: TouchEvent) {
      e.preventDefault()
      const t = e.touches[0]
      touchStart = { x: t.clientX, y: t.clientY }
    }

    function onTouchEnd(e: TouchEvent) {
      e.preventDefault()
      if (!touchStart) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStart.x
      const dy = t.clientY - touchStart.y
      touchStart = null

      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      // Tap → start game (or just do nothing if already started)
      if (absDx < 15 && absDy < 15) {
        if (!gameStartedRef.current) setGameStarted(true)
        return
      }

      // Swipe on tutorial → start and apply direction
      if (!gameStartedRef.current) {
        setGameStarted(true)
        return
      }

      // Swipe during game → steer
      if (absDx > absDy) {
        handleDirection(dx > 0 ? 'RIGHT' : 'LEFT')
      } else {
        handleDirection(dy > 0 ? 'DOWN' : 'UP')
      }
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd, { passive: false })
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [handleDirection])

  const speedVersion = Math.floor((INITIAL_SPEED - gameRef.current.speed) / SPEED_STEP) + 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative border border-[#222222] bg-black animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-[#222222] px-4 py-2 gap-4">
          <span className="font-mono text-xs tracking-widest text-accent">BYTE.EXE</span>
          <div className="flex items-center gap-4">
            {gameStarted && (
              <>
                <span className="font-mono text-xs tracking-widest text-[#444444]">
                  BYTES CONSUMED: {String(score).padStart(3, '0')}
                </span>
                <span className="font-mono text-xs tracking-widest text-[#444444]">
                  v1.{speedVersion}
                </span>
              </>
            )}
            <button
              onClick={onClose}
              className="font-mono text-xs tracking-widest text-muted hover:text-white transition-colors"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={COLS * cell}
          height={ROWS * cell}
          className="block"
        />

        {/* Hint bar */}
        <div className="border-t border-[#222222] px-4 py-2 flex gap-6">
          {isTouchDevice ? (
            <>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">Swipe Move</span>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">Tap Start</span>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">ESC Close</span>
            </>
          ) : (
            <>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">↑↓←→ Move</span>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">Space Start</span>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">R Restart</span>
              <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase">ESC Close</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
