import { useRef, useState } from 'react'
import CropOverlay from './CropOverlay.jsx'
import { ReplaceImage } from './icons'

export default function CanvasStage({
  canvasRef,
  activeTool,
  setActiveTool,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPickColor,
  applyCrop,
  busy,
  image,
  onReplace,
}) {
  const wrapRef = useRef(null)
  const [dropping, setDropping] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDropping(false)
    const f = e.dataTransfer.files?.[0]
    if (f) onReplace(f)
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDropping(true)
      }}
      onDragLeave={() => setDropping(false)}
      onDrop={handleDrop}
      className={`relative flex min-h-[320px] flex-1 items-center justify-center overflow-auto p-3 transition-colors duration-300 sm:p-6 lg:min-h-0 ${
        dropping ? 'bg-primary/10' : 'bg-white'
      }`}
    >
      <div ref={wrapRef} className="checkerboard relative inline-block max-h-full rounded-lg shadow-soft ring-1 ring-black/5">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            if (activeTool === 'bgremove') {
              onPickColor?.(e.clientX, e.clientY)
              return
            }
            onPointerDown(e)
          }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className={`block max-w-full rounded-lg ${
            activeTool === 'draw' ? 'cursor-crosshair touch-none' : ''
          } ${activeTool === 'text' ? 'cursor-move touch-none' : ''} ${
            activeTool === 'bgremove' ? 'cursor-cell' : ''
          } ${activeTool === 'crop' ? 'pointer-events-none' : ''}`}
          style={{ maxHeight: 'clamp(300px, 56vh, 640px)' }}
        />
        {activeTool === 'crop' && (
          <CropOverlay
            canvasEl={canvasRef}
            onApply={applyCrop}
            onCancel={() => setActiveTool('adjust')}
          />
        )}
        {busy && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm">
            <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary/25 border-t-primary" />
          </div>
        )}
        {image && !dropping && (
          <button
            type="button"
            onClick={() => document.getElementById('replace-input')?.click()}
            title="Replace image"
            className="absolute right-2 top-2 z-0 hidden items-center gap-1.5 rounded-lg bg-black/45 px-2.5 py-1.5 text-[11px] font-bold text-white backdrop-blur transition-colors duration-200 hover:bg-black/70 sm:inline-flex"
          >
            <ReplaceImage size={13} /> Replace
          </button>
        )}
        <input
          id="replace-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            onReplace(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>

      {dropping && (
        <div className="pointer-events-none absolute inset-4 z-30 flex items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-white/80">
          <p className="text-sm font-extrabold text-primary">Drop to replace image</p>
        </div>
      )}
    </div>
  )
}
