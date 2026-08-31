import { useEffect, useState } from 'react'
import {
  Crop,
  Eraser,
  Info,
  Lock,
  Palette,
  Pipette,
  Plus,
  Sparkles,
  Trash2,
  Unlock,
} from 'lucide-react'
import { ADJUSTMENTS, FILTER_PRESETS } from '../hooks/useEditor.js'

const SWATCHES = ['#1F2937', '#FFFFFF', '#6C5CE7', '#00B894', '#FF6B6B', '#FDCB6E', '#0984E3', '#E84393']

function PanelShell({ title, subtitle, children }) {
  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs font-medium text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4 scrollbar-thin">{children}</div>
    </div>
  )
}

function Slider({ label, value, min, max, step, unit, onChange, onCommit }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-bold text-gray-600">
        {label}
        <span className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[11px] font-bold text-primary">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={onCommit}
        onKeyUp={onCommit}
        className="range-slider"
      />
    </label>
  )
}

function AdjustPanel({ params, setParam, commit }) {
  const reset = () => {
    ADJUSTMENTS.forEach((a) =>
      setParam(a.key, ['brightness', 'contrast', 'saturation'].includes(a.key) ? 100 : 0),
    )
    commit()
  }
  return (
    <PanelShell title="Adjust" subtitle="Fine-tune light & color">
      {ADJUSTMENTS.map((a) => (
        <Slider
          key={a.key}
          label={a.label}
          value={params[a.key]}
          min={a.min}
          max={a.max}
          step={a.step}
          unit={a.unit}
          onChange={(v) => setParam(a.key, v)}
          onCommit={commit}
        />
      ))}
      <button type="button" onClick={reset} className="btn-ghost w-full !py-2 !text-xs">
        Reset adjustments
      </button>
    </PanelShell>
  )
}

function FiltersPanel({ applyPreset, params }) {
  const activeName =
    FILTER_PRESETS.find(
      (p) =>
        Object.entries(p.params).every(([k, v]) => params[k] === v) &&
        Object.keys(p.params).length > 0,
    )?.name || 'Original'
  return (
    <PanelShell title="Filters" subtitle="One-tap looks, stacked on your adjustments">
      <div className="grid grid-cols-2 gap-2.5">
        {FILTER_PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => applyPreset(p)}
            className={`group rounded-xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift ${
              activeName === p.name ? 'border-primary bg-primary/5 shadow-soft' : 'border-line bg-white'
            }`}
          >
            <span
              className={`mb-2 block h-10 w-full rounded-lg bg-gradient-to-br ${
                p.name === 'Mono'
                  ? 'from-gray-500 to-gray-800 grayscale'
                  : p.name === 'Sepia'
                    ? 'from-amber-300 to-amber-700 sepia'
                    : p.name === 'Vivid'
                      ? 'from-fuchsia-500 via-violet-500 to-cyan-400 saturate-150'
                      : p.name === 'Cool'
                        ? 'from-sky-400 to-indigo-600'
                        : p.name === 'Warm'
                          ? 'from-orange-300 to-rose-500'
                          : p.name === 'Fade'
                            ? 'from-gray-200 to-gray-400 opacity-80'
                            : p.name === 'Drama'
                              ? 'from-slate-900 via-red-900 to-slate-700 contrast-125'
                              : 'from-primary to-secondary'
              } transition-transform duration-200 group-hover:scale-[1.03]`}
            />
            <span className="text-xs font-extrabold text-ink">{p.name}</span>
          </button>
        ))}
      </div>
    </PanelShell>
  )
}

function CropHintPanel() {
  return (
    <PanelShell title="Crop" subtitle="Drag on the image to select a region">
      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <Crop size={18} className="mt-0.5 shrink-0 text-primary" />
        <p className="text-xs font-semibold leading-relaxed text-gray-600">
          A selection box is active over your photo. Drag inside it to move, pull the corner
          handles to resize, or drag on empty area to start a new selection — then hit{' '}
          <span className="font-extrabold text-primary">Apply Crop</span>.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-surface p-3 text-xs font-bold text-gray-500">
        <Info size={14} className="text-secondary" />
        Cropping flattens current edits inside the selected region.
      </div>
    </PanelShell>
  )
}

function ResizePanel({ image, applyResize }) {
  const [w, setW] = useState(image?.width || 800)
  const [h, setH] = useState(image?.height || 600)
  const [lock, setLock] = useState(true)
  const ratio = image ? image.width / image.height : 1

  useEffect(() => {
    if (image) {
      setW(image.width)
      setH(image.height)
    }
  }, [image])

  const onW = (v) => {
    setW(v)
    if (lock) setH(Math.max(1, Math.round(v / ratio)))
  }
  const onH = (v) => {
    setH(v)
    if (lock) setW(Math.max(1, Math.round(v * ratio)))
  }

  const presets = [
    { label: 'Full HD', w: 1920 },
    { label: 'HD', w: 1280 },
    { label: 'Web', w: 800 },
    { label: 'Thumb', w: 320 },
  ]

  return (
    <PanelShell title="Resize" subtitle="Scale to exact dimensions">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-gray-600">Width (px)</span>
          <input
            type="number"
            min={8}
            value={w}
            onChange={(e) => onW(Number(e.target.value))}
            className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold outline-none transition-colors focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-gray-600">Height (px)</span>
          <input
            type="number"
            min={8}
            value={h}
            onChange={(e) => onH(Number(e.target.value))}
            className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold outline-none transition-colors focus:border-primary"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => setLock((v) => !v)}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-extrabold transition-all ${
          lock ? 'border-primary/30 bg-primary/5 text-primary' : 'border-line text-gray-500'
        }`}
      >
        {lock ? <Lock size={13} /> : <Unlock size={13} />}
        Aspect ratio {lock ? 'locked' : 'free'}
      </button>

      <div className="grid grid-cols-2 gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => onW(p.w)}
            className="card-hover rounded-xl border border-line bg-white px-3 py-2 text-xs font-extrabold text-gray-600 hover:text-primary"
          >
            {p.label} · {p.w}px
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => applyResize(w, h)}
        disabled={!image || busyGuard(w, h)}
        className="btn-gradient w-full"
      >
        Apply Resize
      </button>
    </PanelShell>
  )
}

const busyGuard = (w, h) => !(w >= 8 && h >= 8)

function TextPanel({ annotations, addText, updateText, removeText, selectedId, setSelectedId }) {
  const texts = annotations.filter((a) => a.type === 'text')
  const selected = texts.find((t) => t.id === selectedId)

  return (
    <PanelShell title="Text" subtitle="Add captions & headings">
      <button type="button" onClick={addText} className="btn-gradient w-full">
        <Plus size={16} /> Add Text Layer
      </button>

      {texts.length > 0 && (
        <div className="space-y-2">
          {texts.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-extrabold transition-all ${
                t.id === selectedId
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-line text-gray-600 hover:border-primary/30'
              }`}
            >
              <span className="truncate">Text {i + 1}</span>
              <Trash2
                size={13}
                className="shrink-0 text-gray-300 transition-colors hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation()
                  removeText(t.id)
                }}
              />
            </button>
          ))}
        </div>
      )}

      {selected ? (
        <div className="space-y-4 rounded-xl border border-line bg-white p-4 animate-pop-in">
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-gray-600">Content</span>
            <textarea
              rows={2}
              value={selected.text}
              onChange={(e) => updateText(selected.id, { text: e.target.value })}
              className="w-full resize-none rounded-xl border border-line px-3 py-2 text-sm font-semibold outline-none transition-colors focus:border-primary"
            />
          </label>
          <Slider
            label="Size"
            value={selected.size}
            min={12}
            max={160}
            step={1}
            unit="px"
            onChange={(v) => updateText(selected.id, { size: v })}
            onCommit={() => {}}
          />
          <div>
            <span className="mb-1.5 block text-xs font-bold text-gray-600">Color</span>
            <div className="flex flex-wrap items-center gap-2">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateText(selected.id, { color: c })}
                  style={{ background: c }}
                  className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    selected.color === c ? 'border-primary ring-2 ring-primary/30' : 'border-white shadow'
                  }`}
                />
              ))}
              <input
                type="color"
                value={selected.color}
                onChange={(e) => updateText(selected.id, { color: e.target.value })}
                className="h-7 w-9 cursor-pointer rounded-md border border-line bg-white"
              />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-gray-400">
            Tip: drag the text directly on the canvas to reposition it.
          </p>
        </div>
      ) : (
        texts.length > 0 && (
          <p className="text-xs font-semibold text-gray-400">Select a layer above to edit it.</p>
        )
      )}
    </PanelShell>
  )
}

function DrawPanel({ setBrush }) {
  const [color, setColor] = useState('#6C5CE7')
  const [size, setSize] = useState(6)
  useEffect(() => setBrush(color, size), [color, size, setBrush])
  return (
    <PanelShell title="Draw" subtitle="Freehand annotate on the photo">
      <div>
        <span className="mb-1.5 block text-xs font-bold text-gray-600">Brush color</span>
        <div className="flex flex-wrap items-center gap-2">
          {SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              style={{ background: c }}
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c ? 'border-primary ring-2 ring-primary/30' : 'border-white shadow'
              }`}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded-md border border-line bg-white"
          />
        </div>
      </div>
      <Slider
        label="Brush size"
        value={size}
        min={1}
        max={40}
        step={1}
        unit="px"
        onChange={setSize}
        onCommit={() => {}}
      />
      <div className="flex items-center gap-2 rounded-xl bg-surface p-3 text-xs font-bold text-gray-500">
        <Palette size={14} className="text-primary" />
        Draw directly on the canvas with your mouse or finger.
      </div>
    </PanelShell>
  )
}

const POSITIONS = [
  { id: 'tl', label: 'Top Left' },
  { id: 'tr', label: 'Top Right' },
  { id: 'c', label: 'Center' },
  { id: 'bl', label: 'Bottom Left' },
  { id: 'br', label: 'Bottom Right' },
]

function BgRemovePanel({
  removeBgAI,
  bgProgress,
  bgKey,
  setBgKeyProp,
  applyColorKey,
  autoDetectKey,
}) {
  const [mode, setMode] = useState('ai')

  return (
    <PanelShell title="Remove Background" subtitle="Cut out the subject in one tap">
      <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-surface p-1.5">
        {[
          { id: 'ai', label: 'AI Cutout' },
          { id: 'key', label: 'Color Key' },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-lg px-3 py-2 text-xs font-extrabold transition-all duration-200 ${
              mode === m.id
                ? 'bg-white text-primary shadow-soft'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'ai' ? (
        <div className="space-y-4 animate-fade-in">
          <button
            type="button"
            onClick={removeBgAI}
            disabled={!!bgProgress}
            className="btn-gradient w-full !py-3"
          >
            <Sparkles size={17} />
            {bgProgress ? 'Working…' : 'Remove Background'}
          </button>

          {bgProgress && (
            <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/5 p-4 animate-pop-in">
              <div className="flex items-center justify-between text-xs font-extrabold text-primary">
                <span>{bgProgress.phase}</span>
                <span className="font-mono">{bgProgress.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-lime-400 transition-all duration-300"
                  style={{ width: `${bgProgress.pct}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4">
            <Info size={14} className="mt-0.5 shrink-0 text-secondary" />
            <p className="text-[11px] font-semibold leading-relaxed text-gray-500">
              AI mode runs fully on your device. The model (~40MB) downloads once on first use and
              is cached — an internet connection is required for that first download.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div>
            <span className="mb-1.5 block text-xs font-bold text-gray-600">Key color</span>
            <div className="flex items-center gap-2">
              <span
                style={{ background: bgKey.color }}
                className="h-9 w-9 shrink-0 rounded-lg border border-line shadow-inner"
              />
              <code className="rounded-md bg-surface px-2 py-1 font-mono text-xs font-bold text-gray-600">
                {bgKey.color.toUpperCase()}
              </code>
              <input
                type="color"
                value={bgKey.color}
                onChange={(e) => setBgKeyProp({ color: e.target.value })}
                className="h-9 w-10 cursor-pointer rounded-md border border-line bg-white"
              />
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3">
            <Pipette size={14} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-[11px] font-semibold leading-relaxed text-gray-600">
              Click anywhere on the photo to pick the background color directly.
            </p>
          </div>

          <Slider
            label="Tolerance"
            value={bgKey.tolerance}
            min={0}
            max={60}
            step={1}
            unit="%"
            onChange={(v) => setBgKeyProp({ tolerance: v })}
            onCommit={() => {}}
          />
          <Slider
            label="Edge softness"
            value={bgKey.softness}
            min={1}
            max={40}
            step={1}
            unit=""
            onChange={(v) => setBgKeyProp({ softness: v })}
            onCommit={() => {}}
          />

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={autoDetectKey} className="btn-ghost !py-2 !text-xs">
              <Pipette size={14} /> Auto detect
            </button>
            <button type="button" onClick={applyColorKey} className="btn-gradient !py-2 !text-xs">
              <Eraser size={14} /> Apply
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-surface p-3 text-[11px] font-bold text-gray-500">
            <Info size={13} className="shrink-0 text-secondary" />
            Best for solid or gradient studio backgrounds.
          </div>
        </div>
      )}
    </PanelShell>
  )
}

function WatermarkPanel({ watermark, setWatermarkProp }) {
  return (
    <PanelShell title="Watermark" subtitle="Brand & protect your image">
      <button
        type="button"
        onClick={() => setWatermarkProp({ enabled: !watermark.enabled })}
        className={`inline-flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-extrabold transition-all ${
          watermark.enabled
            ? 'border-secondary/40 bg-secondary/10 text-secondary'
            : 'border-line text-gray-500'
        }`}
      >
        {watermark.enabled ? 'Watermark visible' : 'Watermark hidden'}
        <span
          className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
            watermark.enabled ? 'bg-secondary' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
              watermark.enabled ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </span>
      </button>

      <label className="block">
        <span className="mb-1 block text-xs font-bold text-gray-600">Text</span>
        <input
          type="text"
          value={watermark.text}
          onChange={(e) => setWatermarkProp({ text: e.target.value })}
          className="w-full rounded-xl border border-line px-3 py-2 text-sm font-semibold outline-none transition-colors focus:border-primary"
        />
      </label>

      <Slider
        label="Size"
        value={watermark.size}
        min={12}
        max={140}
        step={1}
        unit="px"
        onChange={(v) => setWatermarkProp({ size: v })}
        onCommit={() => {}}
      />
      <Slider
        label="Opacity"
        value={Math.round(watermark.opacity * 100)}
        min={10}
        max={100}
        step={1}
        unit="%"
        onChange={(v) => setWatermarkProp({ opacity: v / 100 })}
        onCommit={() => {}}
      />

      <div>
        <span className="mb-1.5 block text-xs font-bold text-gray-600">Color</span>
        <div className="flex flex-wrap items-center gap-2">
          {['#FFFFFF', '#1F2937', '#6C5CE7', '#00B894'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setWatermarkProp({ color: c })}
              style={{ background: c }}
              className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                watermark.color === c ? 'border-primary ring-2 ring-primary/30' : 'border-white shadow'
              }`}
            />
          ))}
          <input
            type="color"
            value={watermark.color}
            onChange={(e) => setWatermarkProp({ color: e.target.value })}
            className="h-7 w-9 cursor-pointer rounded-md border border-line bg-white"
          />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-bold text-gray-600">Position</span>
        <div className="grid grid-cols-3 gap-1.5">
          {POSITIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              title={p.label}
              onClick={() => setWatermarkProp({ position: p.id })}
              className={`relative h-12 rounded-lg border transition-all duration-200 hover:border-primary/50 ${
                watermark.position === p.id ? 'border-primary bg-primary/5' : 'border-line bg-white'
              }`}
            >
              <span
                className={`absolute h-2 w-6 rounded-sm ${watermark.position === p.id ? 'bg-primary' : 'bg-gray-300'} ${
                  p.id === 'tl'
                    ? 'left-1.5 top-1.5'
                    : p.id === 'tr'
                      ? 'right-1.5 top-1.5'
                      : p.id === 'bl'
                        ? 'bottom-1.5 left-1.5'
                        : p.id === 'br'
                          ? 'bottom-1.5 right-1.5'
                          : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </PanelShell>
  )
}

export default function ControlPanel(props) {
  const { activeTool } = props
  switch (activeTool) {
    case 'filters':
      return <FiltersPanel {...props} />
    case 'crop':
      return <CropHintPanel />
    case 'resize':
      return <ResizePanel {...props} />
    case 'text':
      return <TextPanel {...props} />
    case 'draw':
      return <DrawPanel {...props} />
    case 'watermark':
      return <WatermarkPanel {...props} />
    case 'bgremove':
      return <BgRemovePanel {...props} />
    default:
      return <AdjustPanel {...props} />
  }
}
