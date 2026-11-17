"use client"

import * as React from "react"
import gsap from "gsap"

export type TumbleCard = { src?: string; alt?: string; content?: React.ReactNode }
export type TumbleDeckShowcaseProps = {
  cards: TumbleCard[]
  height?: number | string
  aspect?: number
  scrollPerCard?: number
  depth?: number
  background?: string
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}
export const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
export const wrap = (k: number, n: number) => n ? ((k % n) + n) % n : 0
export function fallAngle(t: number): number {
  const u = clamp01(t)
  if (u <= 0.78) return -90 * (u / 0.78) ** 3
  const k = (u - 0.78) / 0.22
  return -90 + 6 * Math.sin(Math.PI * k) * (1 - k)
}
export function deckAdvance(pos: number): number {
  const i = Math.floor(pos)
  const k = clamp01((pos - i - 0.28) / 0.6)
  return i + k * k * (3 - 2 * k)
}
export type Pose = { angle: number; z: number; lift: number; opacity: number; flat: boolean }
export function cardPose(k: number, pos: number, depth: number): Pose {
  const t = pos - k
  const lift = (k - Math.floor(pos) + 3) * 0.6
  if (t >= 1) return { angle: -90, z: 0, lift, opacity: t < 3 ? 1 : 0, flat: true }
  if (t > 0) return { angle: fallAngle(t), z: 0, lift, opacity: 1, flat: false }
  const rel = k - deckAdvance(pos)
  return { angle: 0, z: -Math.max(rel, 0), lift: 0, opacity: clamp01(depth + 1 - rel), flat: false }
}

export default function TumbleDeckShowcase({
  cards, height = "100svh", aspect = 2.06, scrollPerCard = 240, depth = 5,
  background = "var(--bg-surface)", className, style, ariaLabel = "Website showcase",
}: TumbleDeckShowcaseProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = React.useRef<(HTMLImageElement | null)[]>([])
  const slotK = React.useRef<number[]>([])
  const [slotCards, setSlotCards] = React.useState<number[]>([])
  const [active, setActive] = React.useState(0)
  const state = React.useRef({ pos: 0 })
  const geo = React.useRef({ h: 200, gap: 44 })
  const api = React.useRef<{ step: (dir: 1 | -1) => void }>({ step: () => {} })
  const dragged = React.useRef(false)
  const n = cards.length
  const safeDepth = Math.max(0, Math.floor(depth))
  const safeAspect = aspect > 0 ? aspect : 2.06
  const travelPerCard = Math.max(1, scrollPerCard)
  const pool = n ? safeDepth + 5 : 0
  const paint = React.useCallback(() => {
    const { pos } = state.current
    const base = Math.floor(pos) - 2
    const indices = Array.from({ length: pool }, (_, j) => wrap(base + wrap(j - base, pool), n))
    setSlotCards(previous => previous.length === indices.length && previous.every((v, i) => v === indices[i]) ? previous : indices)
    setActive(wrap(Math.round(pos), n))
    cardRefs.current.forEach((el, j) => {
      const img = imgRefs.current[j]
      if (!el || j >= pool) return
      const k = base + wrap(j - base, pool)
      if (slotK.current[j] !== k) {
        slotK.current[j] = k
        const c = cards[wrap(k, n)]
        if (img && c.src) { img.src = c.src; img.alt = c.alt ?? "" }
      }
      const p = cardPose(k, pos, safeDepth)
      el.style.transform = `translate3d(0, ${-p.lift}px, ${p.z * geo.current.gap}px) rotateX(${p.angle}deg)`
      el.style.opacity = String(p.opacity)
      el.style.visibility = p.opacity > 0 ? "visible" : "hidden"
      const current = k === Math.round(pos)
      el.inert = !current
      el.setAttribute('aria-hidden', String(!current))
      el.style.pointerEvents = current ? 'auto' : 'none'
      el.style.setProperty("--td-shade", String(p.flat ? 0.06 : (-p.angle / 90) * 0.06))
    })
  }, [safeDepth, pool, cards, n])
  React.useLayoutEffect(() => { slotK.current = [] }, [cards])
  React.useLayoutEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene) return
    const fit = () => {
      const W = root.clientWidth, H = root.clientHeight
      const fittedAspect = W < 640 && cards.some(card => card.content) ? 1.05 : safeAspect
      const h = Math.max(60, Math.min(W * (W < 420 ? 0.86 : 0.655) / fittedAspect, H * 0.42, 620))
      const top = H / 2 - 0.62 * h
      geo.current = { h, gap: 0.24 * h }
      scene.style.perspective = `${6 * h}px`
      scene.style.perspectiveOrigin = `50% ${top - 1.66 * h}px`
      root.style.setProperty("--td-w", `${h * fittedAspect}px`)
      root.style.setProperty("--td-h", `${h}px`)
      root.style.setProperty("--td-top", `${top}px`)
      paint()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => ro.disconnect()
  }, [safeAspect, paint])
  React.useEffect(() => {
    const root = rootRef.current
    if (!root || !n) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const s = state.current
    let target = s.pos, running = false, acc = 0
    let idle: ReturnType<typeof setTimeout> | undefined
    const follow = () => {
      const dt = gsap.ticker.deltaRatio(60) / 60
      s.pos += (target - s.pos) * (1 - Math.exp(-dt * 9))
      if (Math.abs(target - s.pos) < 0.002) {
        s.pos = target
        gsap.ticker.remove(follow)
        running = false
      }
      paint()
    }
    const push = (to: number) => {
      target = Math.max(Math.round(s.pos) - 3, Math.min(Math.round(s.pos) + 3, to))
      if (motion.matches) { s.pos = target; paint() }
      else if (!running) { running = true; gsap.ticker.add(follow) }
    }
    const settle = (bias = 0) => push(bias > 0 ? Math.floor(target + 0.7) : bias < 0 ? Math.ceil(target - 0.7) : Math.round(target))
    api.current.step = dir => push(Math.round(target) + dir)
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return
      e.preventDefault()
      const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? root.clientHeight : 1
      const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * scale
      if (motion.matches) {
        acc += d
        while (Math.abs(acc) >= travelPerCard) {
          const dir = Math.sign(acc)
          acc -= dir * travelPerCard
          push(target + dir)
        }
        return
      }
      push(target + d / travelPerCard)
      clearTimeout(idle)
      idle = setTimeout(() => settle(Math.sign(d)), 140)
    }
    let drag: { id: number; y: number; travel: number; last: number } | null = null
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return
      if (e.button !== 0) return
      drag = { id: e.pointerId, y: e.clientY, travel: 0, last: 0 }
      dragged.current = false
      clearTimeout(idle)
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const dy = drag.y - e.clientY
      drag.y = e.clientY
      drag.travel += Math.abs(dy)
      if (dy) drag.last = Math.sign(dy)
      if (drag.travel > 6 && !dragged.current) { dragged.current = true; root.setPointerCapture(e.pointerId) }
      if (dragged.current && !motion.matches) push(target + dy / (geo.current.h * 1.1))
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      if (dragged.current) {
        if (motion.matches) push(Math.round(target) + drag.last)
        else settle(drag.last)
      }
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId)
      drag = null
    }
    root.addEventListener("wheel", onWheel, { passive: false })
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerup", onUp)
    root.addEventListener("pointercancel", onUp)
    paint()
    return () => {
      clearTimeout(idle)
      api.current.step = () => {}
      gsap.ticker.remove(follow)
      root.removeEventListener("wheel", onWheel)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerup", onUp)
      root.removeEventListener("pointercancel", onUp)
    }
  }, [n, travelPerCard, paint])
  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); api.current.step(1) }
    else if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); api.current.step(-1) }
  }
  return (
    <div ref={rootRef} role="region" aria-roledescription="carousel" aria-label={ariaLabel}
      tabIndex={n ? 0 : -1} onKeyDown={onKey} onClick={e => { if (!(e.target as HTMLElement).closest('a, button') && !dragged.current) api.current.step(1) }}
      className={["td-root relative w-full touch-none overflow-hidden outline-none select-none", className].filter(Boolean).join(" ")}
      style={{ height, background, ...style }}>
      <style>{`
        .td-scene { position: absolute; inset: 0; transform-style: preserve-3d; }
        .td-card { position: absolute; left: 50%; top: var(--td-top); width: var(--td-w); height: var(--td-h); margin-left: calc(var(--td-w) / -2); transform-origin: 50% 100%; transform-style: preserve-3d; backface-visibility: visible; will-change: transform; border-radius: 3px; overflow: hidden; cursor: pointer; background: var(--bg-card); box-shadow: 0 0 0 1px var(--border-bright); }
        .td-card img { display: block; width: 100%; height: 100%; max-width: none; object-fit: cover; object-position: 50% 0%; pointer-events: none; }
        .td-card::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: #000; opacity: var(--td-shade, 0); }
        .td-root:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
        .td-content { height: 100%; }
        .td-content > article { height: 100%; }
      `}</style>
      <div ref={sceneRef} className="td-scene">
        {Array.from({ length: pool }, (_, j) => (
          <div key={j} ref={el => { cardRefs.current[j] = el }} className="td-card">
            {cards[slotCards[j] ?? wrap(j, n)]?.content ? <div className="td-content">{cards[slotCards[j] ?? wrap(j, n)].content}</div> : <img ref={el => { imgRefs.current[j] = el }} alt="" width={720} height={Math.round(720 / safeAspect)} draggable={false} decoding="async" />}
          </div>
        ))}
      </div>
      {n > 0 && <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-5">
        <button type="button" onClick={() => api.current.step(-1)} aria-label="Previous project" className="rounded-full border border-white/20 bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2">←</button>
        <span aria-live="polite" aria-atomic="true" className="text-xs text-zinc-400">{active + 1} / {n}</span>
        <button type="button" onClick={() => api.current.step(1)} aria-label="Next project" className="rounded-full border border-white/20 bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2">→</button>
      </div>}
      <span className="sr-only">{n} pages. Scroll, drag, click or press the arrow keys to flip through them.</span>
    </div>
  )
}
