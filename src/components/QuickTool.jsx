import { useRef, useState } from 'react'
import { Check, ChevronRight, Download, Home, ImagePlus, Info, Lock } from 'lucide-react'

const COMPRESS_QUALITY = 0.5

export default function QuickTool({ tool }) {
  const inputRef = useRef(null)
  const [img, setImg] = useState(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)

  const load = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setImg({ src: reader.result, name: file.name })
      setDone(null)
    }
    reader.readAsDataURL(file)
  }

  const process = async () => {
    if (!img || busy) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 400))
    try {
      const el = await new Promise((res, rej) => {
        const i = new Image()
        i.onload = () => res(i)
        i.onerror = rej
        i.src = img.src
      })
      let w = el.naturalWidth
      let h = el.naturalHeight
      if (tool.mode === 'upscale') {
        w *= 2
        h *= 2
      }
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      if (tool.format === 'jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, w, h)
      }
      ctx.drawImage(el, 0, 0, w, h)
      const mime = tool.format === 'png' ? 'image/png' : 'image/jpeg'
      const q = tool.mode === 'compress' ? COMPRESS_QUALITY : 0.92
      const out = c.toDataURL(mime, q)
      const a = document.createElement('a')
      a.href = out
      a.download = `${img.name.replace(/\.[^.]+$/, '')}-${tool.ext || 'pixelforge'}.${tool.ext || 'png'}`
      a.click()
      const kb = Math.round((out.length * 0.75) / 1024)
      setDone({ kb, dims: `${w} × ${h}` })
    } finally {
      setBusy(false)
    }
  }

  const isConvert = tool.mode === 'convert'
  const isCompress = tool.mode === 'compress'

  return (
    <div className="mx-auto max-w-3xl">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          load(e.dataTransfer.files?.[0])
        }}
        onClick={() => inputRef.current?.click()}
        className="group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border-2 border-dashed border-line bg-white px-6 py-12 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lift"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            load(e.target.files?.[0])
            e.target.value = ''
          }}
        />
        {img ? (
          <>
            <img src={img.src} alt="" className="max-h-56 rounded-xl shadow-soft" />
            <p className="text-xs font-bold text-gray-500">{img.name}</p>
          </>
        ) : (
          <>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-white shadow-lift transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
              <ImagePlus size={28} />
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-ink">Drop your image here</h3>
              <p className="mt-1 text-sm font-medium text-gray-500">or click to browse your device</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-5 space-y-5 rounded-3xl border border-line bg-white p-6 shadow-soft">
        <button type="button" onClick={process} disabled={!img || busy} className="btn-gradient w-full !py-3.5 !text-base">
          {busy ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Download size={18} />
          )}
          {isConvert && `Convert & Download ${tool.ext.toUpperCase()}`}
          {isCompress && 'Compress & Download'}
          {tool.mode === 'upscale' && 'Upscale 2x & Download'}
        </button>

        {done && (
          <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 animate-pop-in">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-xs font-semibold leading-relaxed text-gray-600">
              Exported <span className="font-extrabold text-primary">{done.kb} KB</span> at{' '}
              {done.dims}px — saved to your downloads.
            </p>
          </div>
        )}

        {!img && (
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-400">
            <Lock size={12} /> Processing happens locally in your browser
          </p>
        )}
      </div>
    </div>
  )
}
