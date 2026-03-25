'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GradientText } from '@/components/ui/GradientText'
import { staggerContainer, fadeInUp, slideInLeft } from '@/lib/animations'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  contact: string
  message: string
}

const BENEFITS = [
  { icon: '⚡', text: 'Создавай сайты и приложения с AI за часы' },
  { icon: '🎯', text: 'Практические проекты с первого дня' },
  { icon: '🤖', text: 'Claude + Cursor — полный рабочий стек' },
  { icon: '🚀', text: 'От идеи до деплоя в production' },
]

function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  multiline,
  disabled,
}: {
  id: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  multiline?: boolean
  disabled?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0

  const inputClass = cn(
    'w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)]',
    'font-body text-sm outline-none resize-none',
    'transition-colors duration-300',
    multiline ? 'min-h-[100px] pt-1' : ''
  )

  return (
    <div className="relative">
      <motion.div
        animate={{
          borderColor: focused
            ? 'var(--accent-cyan)'
            : hasValue
            ? 'var(--border-accent)'
            : 'var(--border)',
          boxShadow: focused ? '0 0 0 1px var(--accent-cyan)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border px-4 py-3 glass"
      >
        <motion.label
          htmlFor={id}
          animate={{
            fontSize: focused || hasValue ? '10px' : '13px',
            color: focused
              ? 'var(--accent-cyan)'
              : 'var(--text-muted)',
            y: focused || hasValue ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
          className="block font-mono uppercase tracking-wider leading-none mb-1 cursor-text"
        >
          {label}{required && ' *'}
        </motion.label>

        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : ''}
            disabled={disabled}
            className={inputClass}
            rows={3}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : ''}
            disabled={disabled}
            className={inputClass}
          />
        )}
      </motion.div>
    </div>
  )
}

function SubmitButton({ state, onClick }: { state: FormState; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={state === 'loading' || state === 'success'}
      whileTap={{ scale: state === 'idle' ? 0.97 : 1 }}
      className={cn(
        'relative w-full h-14 rounded-xl font-display font-bold text-base overflow-hidden',
        'transition-colors duration-300',
        state === 'success'
          ? 'bg-[var(--accent-green)] text-[var(--bg-base)]'
          : state === 'error'
          ? 'bg-[var(--accent-pink)] text-white'
          : 'bg-[var(--accent-cyan)] text-[var(--bg-base)] hover:opacity-90'
      )}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center gap-2"
          >
            Отправить заявку →
          </motion.span>
        )}
        {state === 'loading' && (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"
                strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
            </motion.svg>
          </motion.span>
        )}
        {state === 'success' && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute inset-0 flex items-center justify-center gap-2"
          >
            ✓ Заявка отправлена!
          </motion.span>
        )}
        {state === 'error' && (
          <motion.span
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-2"
          >
            Ошибка — попробуй ещё раз
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function ContactSection() {
  const uid = useId()
  const [form, setForm] = useState<FormData>({ name: '', contact: '', message: '' })
  const [state, setState] = useState<FormState>('idle')

  const setField = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.contact.trim()) return
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setState('success')
        setForm({ name: '', contact: '', message: '' })
      } else {
        setState('error')
        setTimeout(() => setState('idle'), 3000)
      }
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  const isDisabled = state === 'loading' || state === 'success'

  return (
    <SectionWrapper id="contact" className="bg-[var(--bg-elevated)]">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left — текст и benefits */}
        <motion.div variants={slideInLeft} className="space-y-8">
          <div className="space-y-4">
            <SectionLabel number="06" label="Contact" />
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)] leading-tight">
              Хочешь{' '}
              <GradientText from="var(--accent-cyan)" to="var(--accent-violet)" animate>
                так же?
              </GradientText>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md">
              Оставь заявку — расскажем про курс, ответим на вопросы
              и пришлём программу на&nbsp;почту или в&nbsp;мессенджер.
            </p>
          </div>

          {/* Benefits list */}
          <ul className="space-y-4">
            {BENEFITS.map((b, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-xl glass flex items-center justify-center text-lg">
                  {b.icon}
                </span>
                <span className="text-[var(--text-secondary)] text-sm leading-snug">
                  {b.text}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Social proof */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]"
          >
            <div className="flex -space-x-2">
              {['🧑‍💻', '👩‍💻', '🧑‍🎨', '👨‍🚀'].map((e, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full glass border border-[var(--border)] flex items-center justify-center text-sm"
                >
                  {e}
                </span>
              ))}
            </div>
            <span>Уже 200+ студентов прошли курс</span>
          </motion.div>
        </motion.div>

        {/* Right — форма */}
        <motion.div variants={fadeInUp}>
          <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            <InputField
              id={`${uid}-name`}
              label="Имя"
              placeholder="Как тебя зовут?"
              value={form.name}
              onChange={setField('name')}
              required
              disabled={isDisabled}
            />
            <InputField
              id={`${uid}-contact`}
              label="Телефон или Email"
              placeholder="+7 999 ... или name@email.com"
              value={form.contact}
              onChange={setField('contact')}
              required
              disabled={isDisabled}
            />
            <InputField
              id={`${uid}-message`}
              label="Сообщение"
              placeholder="Расскажи о себе или задай вопрос"
              value={form.message}
              onChange={setField('message')}
              multiline
              disabled={isDisabled}
            />

            <SubmitButton state={state} onClick={handleSubmit} />

            <p className="text-center text-xs font-mono text-[var(--text-muted)]">
              Никакого спама. Только ответ на заявку.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
