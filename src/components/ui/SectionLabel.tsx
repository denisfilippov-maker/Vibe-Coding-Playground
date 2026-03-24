import { cn } from '@/lib/utils'

interface SectionLabelProps {
  number: string
  label: string
  className?: string
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'glass text-xs font-mono font-medium tracking-widest uppercase',
        'text-[var(--text-secondary)]',
        className
      )}
    >
      <span className="text-[var(--accent-cyan)]">{number}</span>
      <span>/</span>
      <span>{label}</span>
    </div>
  )
}
