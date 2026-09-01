import { useRef, useState } from 'react'
import { Check, Code2, Download, Monitor, Smartphone, TriangleAlert } from 'lucide-react'

const SAMPLE = `<div style="
  width: 760px;
  padding: 48px;
  background: linear-gradient(135deg, #012604, #065f46);
  border-radius: 24px;
  color: #ffffff;
  font-family: Georgia, serif;
">
  <p style="margin: 0 0 8px; font-size: 14px; letter-spacing: 3px; color: #a7f3d0;">
    IMAGEEDITIFY PHOTO EDITOR
  </p>
  <h1 style="margin: 0; font-size: 42px; line-height: 1.15;">
    Ship visuals that feel<br />hand-crafted.
  </h1>
  <p style="margin: 16px 0 0; font-size: 17px; color: #d1fae5;">
    Rendered from pure HTML — right inside your browser.
  </p>
</div>`

const ensureXmlns = (code) => {
  if (/xmlns\s*=/.test(code)) return code
  return code.replace(/<([a-zA-Z][a-zA-Z0-9]*)/, '<$1 xmlns="http://www.w3.org/1999/xhtml"')
}

const PRESETS = [
  { label: 'Desktop', w: 1200, h: 630, icon: Monitor },
  { label: 'Mobile', w: 420, h: 800, icon: Smartphone },
  { label: 'Square', w: 800, h: 800, icon: null },
  { label: 'Banner', w: 1200, h: 400, icon: null },
]

export default function HtmlTool() {
  const [code, setCode] = useState(SAMPLE)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(420)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const [error, setError] = useState(null)
  const previewKey = useRef(0)

  const applyPreset = (p) => {
    setWidth(p.w)
    setHeight(p.h)
    previewKey.current += 1
  }

  const run = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    setDone(null)
    try {
      const w = Math.max(50, Math.min(4000, Math.round(width) || 800))
      const h = Math.max(50, Math.min(4000, Math.round(height) || 420))
      const inner = ensureXmlns(code)
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${inner}</div></foreignObject></svg>`
      const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
      const img = await new Promise((res, rej) => {
        const i = new Image()
        i.onload = () => res(i)
        i.onerror = () => rej(new Error('render'))
        i.src = url
      })
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      c.getContext('2d').drawImage(img, 0, 0)
      const out = c.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = out
      a.download = 'html-snapshot-imageeditify.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      const kb = Math.round((out.length * 0.75) / 1024)
      setDone({ kb, dims: `${w} × ${h}` })
    } catch {
      setError('Could not render — check that every tag is closed and styles are inline.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <label className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-600">
          <Code2 size={14} className="text-primary" /> Your HTML (inline styles)
        </label>
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            previewKey.current += 1
          }}
          spellCheck={false}
          className="h-64 w-full resize-y rounded-2xl border border-line bg-gray-900 p-4 font-mono text-xs leading-relaxed text-emerald-100 outline-none transition-colors focus:border-primary/60"
        />

        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-gray-600">Width (px)</span>
            <input
              type="number"
              min={50}
              max={4000}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm font-bold text-ink outline-none focus:border-primary/60"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-gray-600">Height (px)</span>
            <input
              type="number"
              min={50}
              max={4000}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm font-bold text-ink outline-none focus:border-primary/60"
            />
          </label>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-extrabold transition-all ${
                width === p.w && height === p.h
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-line text-gray-500 hover:border-primary/30'
              }`}
            >
              {p.icon && <p.icon size={12} />}
              {p.label}
            </button>
          ))}
        </div>

        <button type="button" onClick={run} disabled={busy} className="btn-gradient mt-5 w-full !py-3.5 !text-base">
          {busy ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Download size={18} />
          )}
          Render &amp; Download PNG
        </button>

        {done && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 animate-pop-in">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-xs font-semibold leading-relaxed text-gray-600">
              Exported <span className="font-extrabold text-primary">{done.kb} KB</span> snapshot at{' '}
              {done.dims}px — saved to your downloads.
            </p>
          </div>
        )}
        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 animate-pop-in">
            <TriangleAlert size={16} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-xs font-semibold leading-relaxed text-red-700">{error}</p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-3xl border border-line bg-white p-5 shadow-soft">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-gray-500">Live preview</p>
        <iframe
          key={previewKey.current}
          title="HTML preview"
          sandbox=""
          className="h-[360px] w-full rounded-2xl border border-line bg-white"
          srcDoc={`<!doctype html><html><body style="margin:0;padding:12px;background:#fff">${code}</body></html>`}
        />
        <div className="mt-4 space-y-2 text-[11px] font-semibold text-gray-400">
          <p>External images and web fonts are blocked by browser security — stick to inline styles and system fonts.</p>
        </div>
      </div>
    </div>
  )
}
