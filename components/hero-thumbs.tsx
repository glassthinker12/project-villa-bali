"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react"

const THUMB_WIDTH = 110
const THUMB_GAP = 16
const STEP = THUMB_WIDTH + THUMB_GAP
const TAP_SLOP = 8
const SLIDE_MS = 10_000

function HeroTimer({
  count,
  active,
  durationMs,
}: {
  count: number
  active: number
  durationMs: number
}) {
  return (
    <div
      className="flex h-2 w-full items-center gap-2"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) =>
        i === active ? (
          <div
            key={i}
            className="relative h-2 min-w-px flex-1 overflow-hidden rounded-full border-[1.5px] border-paper"
          >
            <div
              key={active}
              className="h-full w-full origin-left rounded-full bg-paper"
              style={{
                animation: `hero-timer-fill ${durationMs}ms linear forwards`,
              }}
            />
          </div>
        ) : (
          <div
            key={i}
            className="h-2 w-6 shrink-0 rounded-full border-[1.5px] border-paper"
          />
        )
      )}
    </div>
  )
}

export function HeroGallery({
  cover,
  thumbs,
  children,
}: {
  cover: string
  thumbs: string[]
  children: ReactNode
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startScroll: number
    moved: boolean
  } | null>(null)
  const skipClickRef = useRef(false)
  const programmaticScrollRef = useRef(false)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const heroSrc = active === 0 ? cover : thumbs[active]

  const syncActive = useCallback(() => {
    if (programmaticScrollRef.current) return
    const el = scrollerRef.current
    if (!el) return
    const next = Math.round(el.scrollLeft / STEP)
    setActive(Math.min(thumbs.length - 1, Math.max(0, next)))
  }, [thumbs.length])

  const select = useCallback(
    (index: number) => {
      const next = Math.min(thumbs.length - 1, Math.max(0, index))
      setActive(next)
      const el = scrollerRef.current
      if (!el) return
      const left = next * STEP
      const wrapping = Math.abs(el.scrollLeft - left) > STEP * 1.5
      programmaticScrollRef.current = true
      el.scrollTo({ left, behavior: wrapping ? "auto" : "smooth" })
      window.setTimeout(
        () => {
          programmaticScrollRef.current = false
        },
        wrapping ? 50 : 400
      )
    },
    [thumbs.length]
  )

  useEffect(() => {
    if (thumbs.length < 2) return
    const id = window.setTimeout(() => {
      select((active + 1) % thumbs.length)
    }, SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [active, select, thumbs.length])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return
    const el = scrollerRef.current
    if (!el) return
    skipClickRef.current = false
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    const el = scrollerRef.current
    if (!drag || drag.pointerId !== event.pointerId || !el) return
    const delta = event.clientX - drag.startX
    if (!drag.moved && Math.abs(delta) < TAP_SLOP) return
    if (!drag.moved) {
      drag.moved = true
      skipClickRef.current = true
      el.setPointerCapture(event.pointerId)
      setDragging(true)
    }
    el.scrollLeft = drag.startScroll - delta
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    const el = scrollerRef.current
    if (!drag || drag.pointerId !== event.pointerId || !el) return
    dragRef.current = null
    setDragging(false)
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId)
    }
    if (!drag.moved) return
    const snapped = Math.round(el.scrollLeft / STEP) * STEP
    el.scrollTo({ left: snapped, behavior: "smooth" })
  }

  return (
    <section className="relative h-[748px] w-full max-w-[440px] overflow-hidden bg-white">
      <img
        alt=""
        src={heroSrc}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />
      <div className="absolute inset-x-0 top-20 flex h-[668px] flex-col justify-between px-4 py-8">
        {children}
        <div className="flex w-full flex-col gap-4">
          <div
            ref={scrollerRef}
            role="listbox"
            aria-label="Villa photos"
            onScroll={syncActive}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`flex cursor-grab touch-pan-x select-none items-center gap-4 overflow-x-auto overscroll-x-contain active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              dragging ? "" : "snap-x snap-mandatory"
            }`}
          >
            {thumbs.map((src, i) => {
              const selected = i === active
              return (
                <button
                  key={src}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  aria-label={`View photo ${i + 1}`}
                  onClick={() => {
                    if (skipClickRef.current) return
                    select(i)
                  }}
                  className={`h-[72px] w-[110px] shrink-0 cursor-pointer snap-start shadow-[8px_8px_20px_10px_rgba(45,45,45,0.25)] outline-none ${
                    selected ? "border-2 border-cream" : ""
                  }`}
                >
                  <img
                    alt=""
                    src={src}
                    draggable={false}
                    className="pointer-events-none size-full object-cover"
                  />
                </button>
              )
            })}
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <img alt="" src="/figma/icons/park.svg" className="size-6 shrink-0" />
              <p className="truncate text-xs leading-5 font-medium text-white">
                1BR Clifftop Villa Sofia · Ocean View & Private Cave
              </p>
            </div>
            <HeroTimer
              count={thumbs.length}
              active={active}
              durationMs={SLIDE_MS}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
