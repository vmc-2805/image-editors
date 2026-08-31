import { useRef, useState } from 'react'
import { ImagePlus, ShieldCheck, Upload, Zap } from 'lucide-react'

export default function UploadArea({ onUpload, busy }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const openPicker = () => inputRef.current?.click()

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    onUpload(e.dataTransfer.files?.[0])
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={openPicker}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
      className={`group relative flex min-h-[380px] cursor-pointer flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border-2 border-dashed bg-white px-6 py-14 text-center transition-all duration-300 sm:min-h-[460px] ${
        dragOver
          ? 'scale-[1.01] border-primary bg-primary/5 shadow-lift'
          : 'border-line hover:border-primary/50 hover:shadow-soft'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onUpload(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl transition-transform duration-700 ${
          dragOver ? 'scale-150' : 'group-hover:scale-125'
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-20 -left-14 h-52 w-52 rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 blur-2xl transition-transform duration-700 ${
          dragOver ? 'scale-150' : 'group-hover:scale-110'
        }`}
      />

      <span
        className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lift transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:scale-105 ${
          dragOver ? 'animate-bounce' : ''
        }`}
      >
        {busy ? <Zap size={34} className="animate-pulse" /> : <ImagePlus size={34} strokeWidth={2.2} />}
      </span>

      <div className="relative space-y-2">
        <h3 className="text-xl font-extrabold text-ink sm:text-2xl">
          {dragOver ? 'Drop it right here!' : 'Drag & drop your photo'}
        </h3>
        <p className="mx-auto max-w-sm text-sm font-medium text-gray-500">
          or click anywhere in this area to browse — JPG, PNG, WEBP, GIF up to 25MB
        </p>
      </div>

      <button type="button" onClick={(e) => { e.stopPropagation(); openPicker() }} className="btn-gradient relative">
        <Upload size={17} />
        Upload Image
      </button>

      <p className="relative inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3.5 py-1.5 text-xs font-bold text-secondary">
        <ShieldCheck size={13} />
        100% private — editing happens on your device
      </p>
    </div>
  )
}
