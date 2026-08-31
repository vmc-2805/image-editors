import { Minimize2, Sparkles, Eraser, Laugh, Brush, Maximize, Crop, RotateCw, FileImage, FileOutput, Code2, Stamp, EyeOff } from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Compress Image', path: '/tool/compress-image' },
  { label: 'Crop Image', path: '/tool/crop-image' },
  { label: 'Convert to JPG', path: '/tool/convert-to-jpg' },
]

export const MEGA_MENU = [
  {
    title: 'Optimize',
    accent: 'from-emerald-800 to-emerald-500',
    tools: [
      { label: 'Compress Image', desc: 'Shrink file size', icon: Minimize2, path: '/tool/compress-image' },
      { label: 'Upscale', desc: 'Enhance resolution 2x', icon: Sparkles, path: '/tool/upscale' },
      { label: 'Remove Background', desc: 'One-click cutout', icon: Eraser, path: '/tool/remove-background' },
    ],
  },
  {
    title: 'Create',
    accent: 'from-lime-700 to-emerald-500',
    tools: [
      { label: 'Meme Generator', desc: 'Caption any photo', icon: Laugh, path: '/tool/meme-generator' },
      { label: 'Photo Editor', desc: 'Full editing suite', icon: Brush, path: '/editor' },
    ],
  },
  {
    title: 'Modify',
    accent: 'from-teal-800 to-green-600',
    tools: [
      { label: 'Resize Image', desc: 'Custom dimensions', icon: Maximize, path: '/tool/resize-image' },
      { label: 'Crop Image', desc: 'Perfect framing', icon: Crop, path: '/tool/crop-image' },
      { label: 'Rotate Image', desc: 'Turn & straighten', icon: RotateCw, path: '/tool/rotate-image' },
    ],
  },
  {
    title: 'Convert',
    accent: 'from-gray-700 to-gray-500',
    tools: [
      { label: 'Convert to JPG', desc: 'PNG, WEBP → JPG', icon: FileImage, path: '/tool/convert-to-jpg' },
      { label: 'Convert from JPG', desc: 'JPG → any format', icon: FileOutput, path: '/tool/convert-from-jpg' },
      { label: 'HTML to Image', desc: 'Snapshot HTML snippets', icon: Code2, path: '/tool/html-to-image' },
    ],
  },
  {
    title: 'Security',
    accent: 'from-emerald-950 to-primary',
    tools: [
      { label: 'Watermark Image', desc: 'Protect your work', icon: Stamp, path: '/tool/watermark-image' },
      { label: 'Blur Face', desc: 'Auto privacy blur', icon: EyeOff, path: '/tool/blur-face' },
    ],
  },
]
