import { useCallback, useEffect, useRef, useState } from 'react'

export const DEFAULT_PARAMS = {
  rotation: 0,
  flipH: false,
  flipV: false,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hue: 0,
}

export const FILTER_PRESETS = [
  { name: 'Original', params: {} },
  { name: 'Mono', params: { grayscale: 100 } },
  { name: 'Sepia', params: { sepia: 75 } },
  { name: 'Vivid', params: { saturation: 165, contrast: 112 } },
  { name: 'Cool', params: { hue: -18, saturation: 122 } },
  { name: 'Warm', params: { sepia: 28, saturation: 132 } },
  { name: 'Fade', params: { contrast: 85, brightness: 110, saturation: 82 } },
  { name: 'Drama', params: { contrast: 148, brightness: 94, saturation: 118 } },
]

export const ADJUSTMENTS = [
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, step: 1, unit: '%' },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, step: 1, unit: '%' },
  { key: 'saturation', label: 'Saturation', min: 0, max: 200, step: 1, unit: '%' },
  { key: 'blur', label: 'Blur', min: 0, max: 20, step: 0.5, unit: 'px' },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, step: 1, unit: '%' },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, step: 1, unit: '%' },
  { key: 'hue', label: 'Hue', min: -180, max: 180, step: 1, unit: '°' },
]

const MAX_DIM = 3200
const WATERMARK_MARGIN = 28

const clone = (o) => JSON.parse(JSON.stringify(o))
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const blobToDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(blob)
  })

const hexToRgb = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
})

const loadEl = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

const buildFilter = (p) =>
  `brightness(${p.brightness}%) contrast(${p.contrast}%) saturate(${p.saturation}%) blur(${p.blur}px) grayscale(${p.grayscale}%) sepia(${p.sepia}%) hue-rotate(${p.hue}deg)`

function drawStroke(ctx, a) {
  if (a.points.length < 2) return
  ctx.save()
  ctx.strokeStyle = a.color
  ctx.lineWidth = a.size
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(a.points[0][0], a.points[0][1])
  for (let i = 1; i < a.points.length; i++) ctx.lineTo(a.points[i][0], a.points[i][1])
  ctx.stroke()
  ctx.restore()
}

function drawText(ctx, a) {
  ctx.save()
  ctx.font = `700 ${a.size}px "Plus Jakarta Sans", sans-serif`
  ctx.textBaseline = 'top'
  ctx.fillStyle = a.color
  ctx.shadowColor = 'rgba(0,0,0,0.25)'
  ctx.shadowBlur = 4
  ctx.fillText(a.text, a.x, a.y)
  ctx.restore()
}

function drawWatermark(ctx, wm, W, H) {
  if (!wm.enabled || !wm.text.trim()) return
  ctx.save()
  ctx.globalAlpha = wm.opacity
  ctx.font = `800 ${wm.size}px "Plus Jakarta Sans", sans-serif`
  ctx.textBaseline = 'top'
  ctx.fillStyle = wm.color
  ctx.shadowColor = 'rgba(0,0,0,0.35)'
  ctx.shadowBlur = 6
  const w = ctx.measureText(wm.text).width
  const pos = {
    tl: [WATERMARK_MARGIN, WATERMARK_MARGIN],
    tr: [W - w - WATERMARK_MARGIN, WATERMARK_MARGIN],
    bl: [WATERMARK_MARGIN, H - wm.size - WATERMARK_MARGIN],
    br: [W - w - WATERMARK_MARGIN, H - wm.size - WATERMARK_MARGIN],
    c: [(W - w) / 2, (H - wm.size) / 2],
  }[wm.position] || [W - w - WATERMARK_MARGIN, H - wm.size - WATERMARK_MARGIN]
  ctx.fillText(wm.text, pos[0], pos[1])
  ctx.restore()
}

export default function useEditor() {
  const canvasRef = useRef(null)
  const baseImgRef = useRef(null)
  const imageRef = useRef(null)
  const paramsRef = useRef({ ...DEFAULT_PARAMS })
  const annRef = useRef([])
  const wmRef = useRef(null)
  const histRef = useRef({ stack: [], index: -1 })
  const imgCacheRef = useRef(new Map())
  const drawStateRef = useRef(null)
  const toastTimer = useRef(null)
  const commitTimer = useRef(null)

  const [image, setImage] = useState(null)
  const [params, setParams] = useState({ ...DEFAULT_PARAMS })
  const [annotations, setAnnotations] = useState([])
  const [watermark, setWatermark] = useState({
    enabled: false,
    text: '© ImageEditify',
    size: 32,
    opacity: 0.55,
    color: '#ffffff',
    position: 'br',
  })
  const [hist, setHist] = useState({ stack: [], index: -1 })
  const [activeTool, setActiveTool] = useState('adjust')
  const [selectedId, setSelectedId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState(null)
  const [bgKey, setBgKey] = useState({ color: '#ffffff', tolerance: 22, softness: 18 })
  const [bgProgress, setBgProgress] = useState(null)
  const bgKeyRef = useRef(bgKey)
  const brushColorRef = useRef('#6C5CE7')
  const brushSizeRef = useRef(6)

  if (!wmRef.current) wmRef.current = { ...JSON.parse(JSON.stringify(watermark)) }

  const showToast = useCallback((msg, type = 'success') => {
    clearTimeout(toastTimer.current)
    setToast({ msg, type, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const render = useCallback((skipWatermark = false) => {
    const canvas = canvasRef.current
    const img = baseImgRef.current
    if (!canvas || !img) return
    const p = paramsRef.current
    const rot = ((p.rotation % 360) + 360) % 360
    const swap = rot === 90 || rot === 270
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const W = swap ? ih : iw
    const H = swap ? iw : ih
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, W, H)
    ctx.save()
    ctx.translate(W / 2, H / 2)
    ctx.rotate((rot * Math.PI) / 180)
    ctx.scale(p.flipH ? -1 : 1, p.flipV ? -1 : 1)
    ctx.filter = buildFilter(p)
    ctx.drawImage(img, -iw / 2, -ih / 2, iw, ih)
    ctx.restore()
    ctx.filter = 'none'
    annRef.current.forEach((a) => (a.type === 'stroke' ? drawStroke(ctx, a) : drawText(ctx, a)))
    if (!skipWatermark) drawWatermark(ctx, wmRef.current, W, H)
  }, [])

  const takeSnapshot = useCallback(
    () => ({
      image: imageRef.current ? { ...imageRef.current } : null,
      params: { ...paramsRef.current },
      annotations: clone(annRef.current),
      watermark: { ...wmRef.current },
    }),
    [],
  )

  const restore = useCallback(
    async (snap) => {
      setParams({ ...snap.params })
      paramsRef.current = { ...snap.params }
      setAnnotations(clone(snap.annotations))
      annRef.current = clone(snap.annotations)
      setWatermark({ ...snap.watermark })
      wmRef.current = { ...snap.watermark }
      if (!snap.image) {
        baseImgRef.current = null
        imageRef.current = null
        setImage(null)
        return
      }
      let el = imgCacheRef.current.get(snap.image.src)
      if (!el) {
        el = await loadEl(snap.image.src)
        imgCacheRef.current.set(snap.image.src, el)
      }
      baseImgRef.current = el
      imageRef.current = { ...snap.image }
      setImage({ ...snap.image })
      requestAnimationFrame(render)
    },
    [render],
  )

  const commit = useCallback(() => {
    if (!imageRef.current) return
    const snap = takeSnapshot()
    const h = histRef.current
    const stack = [...h.stack.slice(0, h.index + 1), snap].slice(-40)
    histRef.current = { stack, index: stack.length - 1 }
    setHist(histRef.current)
  }, [takeSnapshot])

  const commitDebounced = useCallback(() => {
    clearTimeout(commitTimer.current)
    commitTimer.current = setTimeout(commit, 450)
  }, [commit])

  const undo = useCallback(() => {
    const h = histRef.current
    if (h.index <= 0) return
    h.index -= 1
    histRef.current = { ...h }
    setHist(histRef.current)
    restore(h.stack[h.index])
  }, [restore])

  const redo = useCallback(() => {
    const h = histRef.current
    if (h.index >= h.stack.length - 1) return
    h.index += 1
    histRef.current = { ...h }
    setHist(histRef.current)
    restore(h.stack[h.index])
  }, [restore])

  const resetAll = useCallback(() => {
    const h = histRef.current
    if (h.index <= 0) return
    h.index = 0
    histRef.current = { ...h }
    setHist(histRef.current)
    restore(h.stack[0])
    showToast('Reset to original image')
  }, [restore, showToast])

  const setParam = useCallback(
    (key, value) => {
      paramsRef.current = { ...paramsRef.current, [key]: value }
      setParams(paramsRef.current)
      render()
    },
    [render],
  )

  const applyPreset = useCallback(
    (preset) => {
      const { rotation, flipH, flipV } = paramsRef.current
      paramsRef.current = { ...DEFAULT_PARAMS, rotation, flipH, flipV, ...preset.params }
      setParams(paramsRef.current)
      render()
      commit()
    },
    [render, commit],
  )

  const loadImage = useCallback(
    async (file) => {
      if (!file || !file.type.startsWith('image/')) {
        showToast('Please choose a valid image file', 'error')
        return
      }
      setBusy(true)
      try {
        const dataUrl = await new Promise((res, rej) => {
          const r = new FileReader()
          r.onload = () => res(r.result)
          r.onerror = rej
          r.readAsDataURL(file)
        })
        let el = await loadEl(dataUrl)
        let { width, height } = el
        let src = dataUrl
        if (Math.max(width, height) > MAX_DIM) {
          const k = MAX_DIM / Math.max(width, height)
          const off = document.createElement('canvas')
          off.width = Math.round(width * k)
          off.height = Math.round(height * k)
          off.getContext('2d').drawImage(el, 0, 0, off.width, off.height)
          src = off.toDataURL('image/png')
          el = await loadEl(src)
          width = el.naturalWidth
          height = el.naturalHeight
          showToast('Large image was downscaled for smooth editing')
        }
        baseImgRef.current = el
        imageRef.current = { src, width, height, name: file.name }
        setImage(imageRef.current)
        paramsRef.current = { ...DEFAULT_PARAMS }
        setParams(paramsRef.current)
        annRef.current = []
        setAnnotations([])
        wmRef.current = { ...watermark, enabled: false }
        setWatermark(wmRef.current)
        setActiveTool('adjust')
        histRef.current = { stack: [takeSnapshot()], index: 0 }
        setHist(histRef.current)
        requestAnimationFrame(render)
      } catch {
        showToast('Could not load this image', 'error')
      } finally {
        setBusy(false)
      }
    },
    [render, showToast, takeSnapshot, watermark],
  )

  const bakeIfAnnotated = useCallback(async () => {
    if (!baseImgRef.current) return
    if (annRef.current.length === 0) return
    render(true)
    const src = canvasRef.current.toDataURL('image/png')
    const el = await loadEl(src)
    baseImgRef.current = el
    imageRef.current = { src, width: el.naturalWidth, height: el.naturalHeight, name: imageRef.current?.name }
    setImage(imageRef.current)
    annRef.current = []
    setAnnotations([])
    paramsRef.current = { ...DEFAULT_PARAMS }
    setParams(paramsRef.current)
  }, [render])

  const rotate = useCallback(async () => {
    if (!imageRef.current || busy) return
    setBusy(true)
    await bakeIfAnnotated()
    const rot = (paramsRef.current.rotation + 90) % 360
    paramsRef.current = { ...paramsRef.current, rotation: rot }
    setParams(paramsRef.current)
    render()
    commit()
    setBusy(false)
  }, [busy, bakeIfAnnotated, render, commit])

  const flip = useCallback(
    async (axis) => {
      if (!imageRef.current || busy) return
      setBusy(true)
      await bakeIfAnnotated()
      const key = axis === 'h' ? 'flipH' : 'flipV'
      paramsRef.current = { ...paramsRef.current, [key]: !paramsRef.current[key] }
      setParams(paramsRef.current)
      render()
      commit()
      setBusy(false)
    },
    [busy, bakeIfAnnotated, render, commit],
  )

  const flattenToSrc = useCallback(async () => {
    render(true)
    return canvasRef.current.toDataURL('image/png')
  }, [render])

  const replaceBase = useCallback(
    async (src, keepName) => {
      const el = await loadEl(src)
      baseImgRef.current = el
      imageRef.current = { src, width: el.naturalWidth, height: el.naturalHeight, name: keepName }
      setImage(imageRef.current)
      annRef.current = []
      setAnnotations([])
      paramsRef.current = { ...DEFAULT_PARAMS }
      setParams(paramsRef.current)
      render()
      commit()
    },
    [render, commit],
  )

  const applyCrop = useCallback(
    async (rect) => {
      if (!imageRef.current || busy) return
      setBusy(true)
      try {
        const c = canvasRef.current
        render(true)
        const x = clamp(Math.round(rect.x), 0, c.width - 8)
        const y = clamp(Math.round(rect.y), 0, c.height - 8)
        const w = clamp(Math.round(rect.w), 8, c.width - x)
        const h = clamp(Math.round(rect.h), 8, c.height - y)
        const off = document.createElement('canvas')
        off.width = w
        off.height = h
        off.getContext('2d').drawImage(c, x, y, w, h, 0, 0, w, h)
        await replaceBase(off.toDataURL('image/png'), imageRef.current?.name)
        showToast(`Cropped to ${w} × ${h}`)
        setActiveTool('adjust')
      } finally {
        setBusy(false)
      }
    },
    [busy, replaceBase, showToast],
  )

  const applyResize = useCallback(
    async (w, h) => {
      if (!imageRef.current || busy) return
      const W = Math.max(8, Math.round(w))
      const H = Math.max(8, Math.round(h))
      setBusy(true)
      try {
        const src = await flattenToSrc()
        const el = await loadEl(src)
        const off = document.createElement('canvas')
        off.width = W
        off.height = H
        const octx = off.getContext('2d')
        octx.imageSmoothingQuality = 'high'
        octx.drawImage(el, 0, 0, W, H)
        await replaceBase(off.toDataURL('image/png'), imageRef.current?.name)
        showToast(`Resized to ${W} × ${H}`)
        setActiveTool('adjust')
      } finally {
        setBusy(false)
      }
    },
    [busy, flattenToSrc, replaceBase, showToast],
  )

  const addText = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const id = `t${Date.now()}`
    const size = Math.max(18, Math.round(c.width / 14))
    annRef.current = [
      ...annRef.current,
      {
        id,
        type: 'text',
        text: 'Double-tap to edit',
        x: Math.round(c.width * 0.12),
        y: Math.round(c.height * 0.42),
        size,
        color: '#ffffff',
      },
    ]
    setAnnotations(annRef.current)
    setSelectedId(id)
    render()
    commit()
  }, [render, commit])

  const updateText = useCallback(
    (id, patch) => {
      annRef.current = annRef.current.map((a) => (a.id === id ? { ...a, ...patch } : a))
      setAnnotations(annRef.current)
      render()
      commitDebounced()
    },
    [render, commitDebounced],
  )

  const removeText = useCallback(
    (id) => {
      annRef.current = annRef.current.filter((a) => a.id !== id)
      setAnnotations(annRef.current)
      setSelectedId(null)
      render()
      commit()
    },
    [render, commit],
  )

  const setWatermarkProp = useCallback(
    (patch) => {
      wmRef.current = { ...wmRef.current, ...patch }
      setWatermark(wmRef.current)
      render()
      commitDebounced()
    },
    [render, commitDebounced],
  )

  const pointerPos = useCallback((e) => {
    const canvas = canvasRef.current
    const r = canvas.getBoundingClientRect()
    return [
      ((e.clientX - r.left) * canvas.width) / r.width,
      ((e.clientY - r.top) * canvas.height) / r.height,
    ]
  }, [])

  const hitText = useCallback((x, y) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return null
    for (let i = annRef.current.length - 1; i >= 0; i--) {
      const a = annRef.current[i]
      if (a.type !== 'text') continue
      ctx.font = `700 ${a.size}px "Plus Jakarta Sans", sans-serif`
      const w = ctx.measureText(a.text).width
      const h = a.size * 1.25
      if (x >= a.x - 6 && x <= a.x + w + 6 && y >= a.y - 6 && y <= a.y + h + 6) return a.id
    }
    return null
  }, [])

  const onCanvasPointerDown = useCallback(
    (e) => {
      if (!imageRef.current || busy) return
      const tool = activeTool
      if (tool !== 'draw' && tool !== 'text') return
      e.currentTarget.setPointerCapture?.(e.pointerId)
      const [x, y] = pointerPos(e)
      if (tool === 'draw') {
        drawStateRef.current = { mode: 'draw', points: [[x, y]] }
      } else {
        const id = hitText(x, y)
        if (id) {
          const a = annRef.current.find((t) => t.id === id)
          drawStateRef.current = { mode: 'move-text', id, dx: x - a.x, dy: y - a.y }
          setSelectedId(id)
        } else {
          setSelectedId(null)
        }
      }
    },
    [activeTool, busy, pointerPos, hitText],
  )

  const onCanvasPointerMove = useCallback(
    (e) => {
      const st = drawStateRef.current
      if (!st) return
      const [x, y] = pointerPos(e)
      if (st.mode === 'draw') {
        const prev = st.points[st.points.length - 1]
        st.points.push([x, y])
        const ctx = canvasRef.current.getContext('2d')
        ctx.save()
        ctx.strokeStyle = brushColorRef.current
        ctx.lineWidth = brushSizeRef.current
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(prev[0], prev[1])
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.restore()
      } else if (st.mode === 'move-text') {
        annRef.current = annRef.current.map((a) =>
          a.id === st.id ? { ...a, x: Math.round(x - st.dx), y: Math.round(y - st.dy) } : a,
        )
        setAnnotations(annRef.current)
        render()
      }
    },
    [pointerPos, render],
  )

  const setBrush = useCallback((color, size) => {
    if (color !== undefined) brushColorRef.current = color
    if (size !== undefined) brushSizeRef.current = size
  }, [])

  const setBgKeyProp = useCallback((patch) => {
    bgKeyRef.current = { ...bgKeyRef.current, ...patch }
    setBgKey(bgKeyRef.current)
  }, [])

  const pickColorAt = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const r = canvas.getBoundingClientRect()
    const x = clamp(Math.round(((clientX - r.left) * canvas.width) / r.width), 0, canvas.width - 1)
    const y = clamp(Math.round(((clientY - r.top) * canvas.height) / r.height), 0, canvas.height - 1)
    const d = canvas.getContext('2d').getImageData(x, y, 1, 1).data
    const hex = `#${[d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`
    setBgKeyProp({ color: hex })
  }, [setBgKeyProp])

  const autoDetectKey = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const pts = [
      [2, 2],
      [canvas.width - 3, 2],
      [2, canvas.height - 3],
      [canvas.width - 3, canvas.height - 3],
    ]
    let r = 0
    let g = 0
    let b = 0
    pts.forEach(([x, y]) => {
      const d = ctx.getImageData(x, y, 1, 1).data
      r += d[0]
      g += d[1]
      b += d[2]
    })
    const hex = `#${[r / 4, g / 4, b / 4]
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('')}`
    setBgKeyProp({ color: hex })
    showToast(`Background color detected: ${hex}`)
  }, [setBgKeyProp, showToast])

  const applyColorKey = useCallback(async () => {
    if (!imageRef.current || busy) return
    setBusy(true)
    try {
      render(true)
      const c = canvasRef.current
      const ctx = c.getContext('2d')
      const imgData = ctx.getImageData(0, 0, c.width, c.height)
      const data = imgData.data
      const { r: kr, g: kg, b: kb } = hexToRgb(bgKeyRef.current.color)
      const tol = bgKeyRef.current.tolerance * 4.43
      const soft = Math.max(1, bgKeyRef.current.softness * 4.43)
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue
        const dr = data[i] - kr
        const dg = data[i + 1] - kg
        const db = data[i + 2] - kb
        const dist = Math.sqrt(dr * dr + dg * dg + db * db)
        if (dist <= tol) {
          data[i + 3] = 0
        } else if (dist <= tol + soft) {
          data[i + 3] = Math.round(data[i + 3] * ((dist - tol) / soft))
        }
      }
      ctx.putImageData(imgData, 0, 0)
      await replaceBase(c.toDataURL('image/png'), imageRef.current?.name)
      showToast('Background removed — transparency applied')
    } finally {
      setBusy(false)
    }
  }, [busy, render, replaceBase, showToast])

  const removeBgAI = useCallback(async () => {
    if (!imageRef.current || busy) return
    setBusy(true)
    setBgProgress({ phase: 'Preparing…', pct: 4 })
    try {
      const { removeBackground } = await import('@imgly/background-removal')
      render(true)
      const srcBlob = await new Promise((res) => canvasRef.current.toBlob(res, 'image/png'))
      setBgProgress({ phase: 'Loading AI model…', pct: 10 })
      const outBlob = await removeBackground(srcBlob, {
        output: { format: 'image/png', quality: 1 },
        progress: (key, current, total) => {
          const pct = total ? Math.max(10, Math.min(99, Math.round((current / total) * 100))) : 50
          setBgProgress({
            phase: key.startsWith('fetch') ? 'Downloading AI model…' : 'Cutting out subject…',
            pct,
          })
        },
      })
      const dataUrl = await blobToDataURL(outBlob)
      await replaceBase(dataUrl, imageRef.current?.name)
      showToast('Background removed with AI')
    } catch {
      showToast('AI model could not load — use Color Key mode instead', 'error')
    } finally {
      setBgProgress(null)
      setBusy(false)
    }
  }, [busy, render, replaceBase, showToast])

  const onCanvasPointerUp = useCallback(() => {
    const st = drawStateRef.current
    if (!st) return
    drawStateRef.current = null
    if (st.mode === 'draw' && st.points.length > 1) {
      annRef.current = [
        ...annRef.current,
        { id: `s${Date.now()}`, type: 'stroke', points: st.points, color: brushColorRef.current, size: brushSizeRef.current },
      ]
      setAnnotations(annRef.current)
      render()
      commit()
    } else if (st.mode === 'move-text') {
      commit()
    }
  }, [render, commit])

  const download = useCallback(
    (format = 'png') => {
      if (!imageRef.current) return
      render()
      const mime = format === 'jpg' ? 'image/jpeg' : 'image/png'
      const url = canvasRef.current.toDataURL(mime, 0.92)
      const a = document.createElement('a')
      const base = (imageRef.current.name || 'image').replace(/\.[^.]+$/, '')
      a.href = url
      a.download = `${base}-imageeditify.${format}`
      a.click()
      showToast(`Downloaded ${format.toUpperCase()}`)
    },
    [render, showToast],
  )

  const saveProject = useCallback(() => {
    if (!imageRef.current) return
    try {
      localStorage.setItem(
        'imageeditify-project',
        JSON.stringify({ savedAt: new Date().toISOString(), ...takeSnapshot() }),
      )
      showToast('Project saved to this browser')
    } catch {
      showToast('Image too large to save locally', 'error')
    }
  }, [takeSnapshot, showToast])

  useEffect(() => {
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.key === 'y') || (e.key === 'z' && e.shiftKey)) {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  return {
    canvasRef,
    image,
    busy,
    activeTool,
    setActiveTool,
    params,
    setParam,
    commitHistory: commit,
    applyPreset,
    annotations,
    selectedId,
    setSelectedId,
    addText,
    updateText,
    removeText,
    watermark,
    setWatermarkProp,
    setBrush,
    bgKey,
    setBgKeyProp,
    bgProgress,
    pickColorAt,
    autoDetectKey,
    applyColorKey,
    removeBgAI,
    onCanvasPointerDown,
    onCanvasPointerMove,
    onCanvasPointerUp,
    rotate,
    flip,
    applyCrop,
    applyResize,
    undo,
    redo,
    canUndo: hist.index > 0,
    canRedo: hist.index < hist.stack.length - 1,
    resetAll,
    download,
    saveProject,
    loadImage,
    toast,
    showToast,
  }
}
