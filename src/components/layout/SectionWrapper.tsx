import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}

export function SectionWrapper({
  children,
  className,
  id,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        'bg-[var(--bg-base)]',
        !fullWidth && 'section-padding',
        className
      )}
    >
      {!fullWidth ? (
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      ) : children}
    </section>
  )
}
