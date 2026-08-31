import {
  Brush,
  Crop,
  Eraser,
  FlipHorizontal,
  FlipVertical,
  Maximize2,
  RotateCw,
  SlidersHorizontal,
  Stamp,
  Type,
  Wand2,
} from 'lucide-react'

const TOOLS = [
  { id: 'adjust', label: 'Adjust', icon: SlidersHorizontal },
  { id: 'filters', label: 'Filters', icon: Wand2 },
  { id: 'crop', label: 'Crop', icon: Crop },
  { id: 'resize', label: 'Resize', icon: Maximize2 },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'draw', label: 'Draw', icon: Brush },
  { id: 'watermark', label: 'Watermark', icon: Stamp },
  { id: 'bgremove', label: 'Cutout', icon: Eraser },
]

export default function ToolRail({ activeTool, setActiveTool, rotate, flip, busy }) {
  return (
    <div className="flex shrink-0 gap-1 overflow-x-auto border-line bg-white p-2 scrollbar-thin lg:flex-col lg:overflow-visible lg:border-r lg:p-3 max-lg:border-b">
      {TOOLS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setActiveTool(t.id)}
          title={t.label}
          className={`tool-btn min-w-[64px] lg:min-w-0 ${activeTool === t.id ? 'tool-btn-active' : ''}`}
        >
          <t.icon size={19} strokeWidth={2.1} />
          <span className="whitespace-nowrap">{t.label}</span>
        </button>
      ))}

      <span className="mx-1 hidden w-full border-t border-line lg:block" />
      <span className="mx-1 hidden self-stretch border-l border-line lg:hidden" />

      <button
        type="button"
        onClick={rotate}
        disabled={busy}
        title="Rotate 90°"
        className="tool-btn min-w-[64px] lg:min-w-0"
      >
        <RotateCw size={19} strokeWidth={2.1} />
        <span className="whitespace-nowrap">Rotate</span>
      </button>
      <button
        type="button"
        onClick={() => flip('h')}
        disabled={busy}
        title="Flip horizontal"
        className="tool-btn min-w-[64px] lg:min-w-0"
      >
        <FlipHorizontal size={19} strokeWidth={2.1} />
        <span className="whitespace-nowrap">Flip H</span>
      </button>
      <button
        type="button"
        onClick={() => flip('v')}
        disabled={busy}
        title="Flip vertical"
        className="tool-btn min-w-[64px] lg:min-w-0"
      >
        <FlipVertical size={19} strokeWidth={2.1} />
        <span className="whitespace-nowrap">Flip V</span>
      </button>
    </div>
  )
}
