import { Link } from 'react-router-dom'

export default function Logo({ compact = false, variant = 'light' }) {
  return (
    <Link
      to="/"
      aria-label="ImageEditify home"
      className="group flex items-center"
    >
      <img
        src="/imageeditify-logo.png"
        alt="ImageEditify logo"
        loading="eager"
        className={`h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
          compact ? 'h-9 sm:h-10' : ''
        } ${
          variant === 'dark'
            ? 'brightness-0 invert'
            : ''
        }`}
      />
    </Link>
  )
}
