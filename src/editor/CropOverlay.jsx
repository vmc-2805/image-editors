import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

const HANDLES = ['nw', 'ne', 'se', 'sw']
const MIN = 40

export default function CropOverlay({ canvasEl, onApply, onCancel }) {
  const overlayRef = useRef(null)
  const [rect, setRect] = useState(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    setRect({ x: w * 0.12, y: h * 0.12, w: w * 0.76, h: h * 0.76 })
  }, [])

  const clampRect = (r) => {
    const el = overlayRef.current
    const W = el.clientWidth
    const H = el.clientHeight
    return {
      x: Math.max(0, Math.min(r.x, W - MIN)),
      y: Math.max(0, Math.min(r.y, H - MIN)),
      w: Math.max(MIN, Math.min(r.w, W)),
      h: Math.max(MIN, Math.min(r.h, H)),
    }
  }

  const pos = (e) => {
    const r = overlayRef.current.getBoundingClientRect()
    return [e.clientX - r.left, e.clientY - r.top]
  }

  const start = (mode, handle) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    const [x, y] = pos(e)
    dragRef.current = { mode, handle, startX: x, startY: y, orig: { ...rect } }
    overlayRef.current.setPointerCapture?.(e.pointerId)
  }

  const move = (e) => {
    const d = dragRef.current
    if (!d || !rect) return
    const [x, y] = pos(e)
    const dx = x - d.startX
    const dy = y - d.startY
    let next
    if (d.mode === 'move') {
      next = { ...rect, x: d.orig.x + dx, y: d.orig.y + dy }
    } else if (d.mode === 'new') {
      next = {
        x: Math.min(d.startX, x),
        y: Math.min(d.startY, y),
        w: Math.abs(dx),
        h: Math.abs(dy),
      }
    } else {
      const o = d.orig
      let nx = o.x
      let ny = o.y
      let nw = o.w
      let nh = o.h
      if (d.handle.includes('w')) {
        nx = o.x + dx
        nw = o.w - dx
      }
      if (d.handle.includes('n')) {
        ny = o.y + dy
        nh = o.h - dy
      }
      if (d.handle.includes('e')) nw = o.w + dx
      if (d.handle.includes('s')) nh = o.h + dy
      next = { x: nx, y: ny, w: nw, h: nh }
    }
    setRect(clampRect(next))
  }

  const end = () => {
    dragRef.current = null
  }

  const apply = () => {
    const canvas = canvasEl.current
    const el = overlayRef.current
    if (!canvas || !el || !rect) return
    const k = canvas.width / el.clientWidth
    onApply({ x: rect.x * k, y: rect.y * k, w: rect.w * k, h: rect.h * k })
  }

  return (
    <div
      ref={overlayRef}
      onPointerDown={start('new')}
      onPointerMove={move}
      onPointerUp={end}
      className="absolute inset-0 z-10 cursor-crosshair touch-none select-none rounded-lg"
    >
      {rect && (
        <>
          <div
            onPointerDown={start('move')}
            onPointerMove={move}
            onPointerUp={end}
            style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
            className="absolute cursor-move border-2 border-white shadow-[0_0_0_9999px_rgba(15,18,35,0.55)] transition-shadow"
          >
            <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/25" />
              ))}
            </div>
            {HANDLES.map((h) => (
              <span
                key={h}
                onPointerDown={start('resize', h)}
                onPointerMove={move}
                onPointerUp={end}
                className={`absolute h-4 w-4 rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-125 ${
                  h === 'nw' ? '-left-2 -top-2 cursor-nwse-resize' : ''
                }${h === 'ne' ? '-right-2 -top-2 cursor-nesw-resize' : ''}${
                  h === 'se' ? '-bottom-2 -right-2 cursor-nwse-resize' : ''
                }${h === 'sw' ? '-bottom-2 -left-2 cursor-nesw-resize' : ''}`}
              />
            ))}
            <span className="absolute -top-7 left-0 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
              {Math.round(rect.w)} × {Math.round(rect.h)} px
            </span>
          </div>

          <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-mega animate-pop-in">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                apply()
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-extrabold text-white transition-transform hover:-translate-y-0.5"
            >
              <Check size={14} /> Apply Crop
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                onCancel()
              }}
              className="btn-ghost !px-4 !py-2 !text-xs"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}
