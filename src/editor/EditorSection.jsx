import { Download, Redo2, RotateCcw, Save, Undo2 } from 'lucide-react'
import useEditor from '../hooks/useEditor.js'
import UploadArea from './UploadArea.jsx'
import CanvasStage from './CanvasStage.jsx'
import ToolRail from './ToolRail.jsx'
import ControlPanel from './ControlPanel.jsx'

function Toast({ toast }) {
  if (!toast) return null
  return (
    <div
      key={toast.id}
      className={`fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 animate-pop-in rounded-xl px-5 py-3 text-sm font-bold text-white shadow-mega ${
        toast.type === 'error' ? 'bg-red-500' : 'bg-ink'
      }`}
    >
      {toast.msg}
    </div>
  )
}

export default function EditorSection() {
  const ed = useEditor()

  return (
    <section id="editor" className="relative scroll-mt-20 overflow-hidden pb-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(1, 38, 4, 0.09) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[780px] -translate-x-1/2 rounded-full bg-emerald-300/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-lime-300/25 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
            Photo Editor
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Edit like a pro — <span className="text-gradient">right in your browser</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={ed.undo} disabled={!ed.canUndo} title="Undo (Ctrl+Z)" className="btn-ghost !px-3">
            <Undo2 size={16} />
          </button>
          <button type="button" onClick={ed.redo} disabled={!ed.canRedo} title="Redo (Ctrl+Y)" className="btn-ghost !px-3">
            <Redo2 size={16} />
          </button>
          <button type="button" onClick={ed.resetAll} disabled={!ed.image} title="Reset all" className="btn-ghost !px-3">
            <RotateCcw size={16} />
          </button>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
          <button type="button" onClick={ed.saveProject} disabled={!ed.image} className="btn-ghost !py-2 !text-xs">
            <Save size={15} /> Save
          </button>
          <button type="button" onClick={() => ed.download('png')} disabled={!ed.image} className="btn-ghost !py-2 !text-xs">
            <Download size={15} /> PNG
          </button>
          <button type="button" onClick={() => ed.download('jpg')} disabled={!ed.image} className="btn-gradient !px-4 !py-2 !text-xs">
            <Download size={15} /> Download JPG
          </button>
        </div>
      </div>

      {!ed.image ? (
        <UploadArea onUpload={ed.loadImage} busy={ed.busy} />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft animate-fade-up">
          <div className="grid lg:grid-cols-[92px_1fr_320px]">
            <ToolRail
              activeTool={ed.activeTool}
              setActiveTool={ed.setActiveTool}
              rotate={ed.rotate}
              flip={ed.flip}
              busy={ed.busy}
            />
            <CanvasStage
              canvasRef={ed.canvasRef}
              activeTool={ed.activeTool}
              setActiveTool={ed.setActiveTool}
              onPointerDown={ed.onCanvasPointerDown}
              onPointerMove={ed.onCanvasPointerMove}
              onPointerUp={ed.onCanvasPointerUp}
              onPickColor={ed.pickColorAt}
              applyCrop={ed.applyCrop}
              busy={ed.busy}
              image={ed.image}
              onReplace={ed.loadImage}
            />
            <aside className="max-h-[560px] overflow-y-auto border-t border-line bg-white scrollbar-thin lg:max-h-none lg:border-l lg:border-t-0">
              <ControlPanel
                activeTool={ed.activeTool}
                params={ed.params}
                setParam={ed.setParam}
                commit={ed.commitHistory}
                applyPreset={ed.applyPreset}
                image={ed.image}
                applyResize={ed.applyResize}
                annotations={ed.annotations}
                addText={ed.addText}
                updateText={ed.updateText}
                removeText={ed.removeText}
                selectedId={ed.selectedId}
                setSelectedId={ed.setSelectedId}
                watermark={ed.watermark}
                setWatermarkProp={ed.setWatermarkProp}
                setBrush={ed.setBrush}
                removeBgAI={ed.removeBgAI}
                bgProgress={ed.bgProgress}
                bgKey={ed.bgKey}
                setBgKeyProp={ed.setBgKeyProp}
                applyColorKey={ed.applyColorKey}
                autoDetectKey={ed.autoDetectKey}
              />
            </aside>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-surface px-4 py-2.5 text-[11px] font-bold text-gray-400">
            <span>
              {ed.image.name || 'image'} · {ed.image.width} × {ed.image.height}px
            </span>
            <span className="hidden sm:block">Undo: Ctrl+Z · Redo: Ctrl+Y · Everything runs offline</span>
          </div>
        </div>
      )}

      <Toast toast={ed.toast} />
      </div>
    </section>
  )
}
