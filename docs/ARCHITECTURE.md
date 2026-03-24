# ARCHITECTURE.md — Архитектура и компоненты

## Структура файлов и папок

```
vibe-coding-playground/
├── docs/                          # Контекст для Cursor
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── TECH_STACK.md
│   └── CURRENT_STATUS.md
│
├── public/
│   ├── favicon.ico
│   └── og-image.png               # Open Graph превью
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (шрифты, metadata, ThemeProvider)
│   │   ├── page.tsx               # Главная страница — собирает все секции
│   │   └── globals.css            # CSS переменные, базовые стили, scrollbar
│   │
│   ├── components/
│   │   ├── sections/              # Секции страницы (крупные блоки)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AnimationsSection.tsx
│   │   │   ├── InteractivitySection.tsx
│   │   │   ├── VisualEffectsSection.tsx
│   │   │   ├── ResponsiveSection.tsx
│   │   │   └── FooterSection.tsx
│   │   │
│   │   ├── ui/                    # Атомарные UI компоненты
│   │   │   ├── GlassCard.tsx      # Glassmorphism карточка
│   │   │   ├── NeonButton.tsx     # Кнопка с неон-эффектом
│   │   │   ├── GradientText.tsx   # Текст с градиентом
│   │   │   ├── SectionLabel.tsx   # Метка секции ("01 / ANIMATIONS")
│   │   │   └── AnimatedCounter.tsx # Анимированный счётчик цифр
│   │   │
│   │   ├── interactive/           # Интерактивные демо-компоненты
│   │   │   ├── ConfettiButton.tsx # Кнопка с конфетти
│   │   │   ├── MorphButton.tsx    # Кнопка с морфингом формы
│   │   │   ├── AnimatedSlider.tsx # Слайдер с анимацией
│   │   │   ├── ThemeToggle.tsx    # Переключатель тёмной/светлой темы
│   │   │   └── DevicePreview.tsx  # Превью на разных устройствах
│   │   │
│   │   └── layout/
│   │       ├── Navbar.tsx         # Навигация (появляется при скролле)
│   │       └── SectionWrapper.tsx # Обёртка секции с общими стилями
│   │
│   ├── hooks/
│   │   ├── useTheme.ts            # Логика переключения тем
│   │   ├── useScrollProgress.ts   # Прогресс скролла страницы
│   │   └── useStaggerAnimation.ts # Хелпер для stagger анимаций
│   │
│   ├── lib/
│   │   ├── utils.ts               # cn() утилита (clsx + twMerge)
│   │   └── animations.ts          # Переиспользуемые варианты анимаций Framer Motion
│   │
│   ├── providers/
│   │   └── ThemeProvider.tsx      # Context для темы (dark/light)
│   │
│   └── types/
│       └── index.ts               # Общие TypeScript типы
│
├── tailwind.config.ts             # Кастомные цвета, анимации, шрифты
├── next.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## Описание компонентов

### Секции (`src/components/sections/`)

#### `HeroSection.tsx`
**Ответственность:** Первый экран, создаёт "вау" эффект

**Содержит:**
- Анимированный заголовок "Vibe Coding Playground" — буквы появляются по одной (stagger)
- Подзаголовок с fade-in задержкой
- Animated gradient background — 3 цветных "пятна" двигаются плавно (CSS keyframes)
- Parallax эффект при движении мыши (useMotionValue)
- Scroll indicator внизу (пульсирующая стрелка вниз)
- Floating particles — 20+ точек плавают в фоне

**Пропсы:** нет (standalone секция)

**Ключевые анимации:**
```ts
const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  })
}
```

---

#### `AnimationsSection.tsx`
**Ответственность:** Демонстрация scroll-triggered и stagger анимаций

**Содержит:**
- Заголовок секции с SectionLabel ("02 / ANIMATIONS")
- Grid из 6 карточек, каждая демонстрирует одну технику:
  1. `FadeCard` — fade in от opacity 0
  2. `SlideCard` — въезжает снизу
  3. `ScaleCard` — появляется из scale(0.8)
  4. `RotateCard` — лёгкий rotateX при появлении
  5. `SpringCard` — spring физика (bouncy)
  6. `PathCard` — SVG path animation (рисование линии)
- Кнопка "Replay" — перезапускает все анимации
- Счётчик 0→100 при входе в viewport

**Пропсы:** нет

**Ключевая техника:**
```ts
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}
```

---

#### `InteractivitySection.tsx`
**Ответственность:** Показать что сайт "живой"

**Содержит:**
- `ConfettiButton` — взрыв конфетти при клике (canvas-confetti)
- `MorphButton` — кнопка трансформируется в чекмарк при клике
- `AnimatedSlider` — слайдер с анимированным треком и цветовым переходом
- `ThemeToggle` — большой красивый переключатель day/night
- `RippleButton` — ripple эффект при клике (как Material Design, но кастомный)
- Счётчик кликов с анимированными цифрами

**Пропсы:** нет (всё самодостаточно)

---

#### `VisualEffectsSection.tsx`
**Ответственность:** Демонстрация визуальных техник 2025

**Содержит:**
- `GlassCard` showcase — карточки со стеклянным эффектом на gradient bg
- Neon glow showcase — текст и границы с box-shadow неон
- Gradient mesh — живой CSS градиент с анимацией hue-rotate
- Noise texture overlay — grain эффект (SVG feTurbulence)
- Aurora effect — переливающийся северное сияние (CSS animation)
- Hover color shift — карточки меняют акцентный цвет при hover

**Ключевые CSS техники:**
```css
.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
}

.neon-glow {
  box-shadow: 0 0 20px var(--accent-cyan),
              0 0 40px var(--accent-cyan),
              0 0 80px var(--accent-cyan);
}
```

---

#### `ResponsiveSection.tsx`
**Ответственность:** Интерактивная демонстрация адаптивности

**Содержит:**
- Device switcher — 3 кнопки (Desktop / Tablet / Mobile) с иконками
- Iframe-like preview — контент ресайзится анимированно
- Внутри превью — мини-версия карточки с правильным брейкпойнтом
- Отображение текущего breakpoint (`sm`, `md`, `lg`, `xl`)
- Анимация перехода между размерами (width transition с spring)

---

#### `FooterSection.tsx`
**Ответственность:** Завершение, CTA, ссылки

**Содержит:**
- Большой текст "Vibe Coding Playground" (полупрозрачный, за контентом)
- CTA блок: "Хочешь научиться так же?"
- Кнопка "Пройти курс" (primary CTA)
- GitHub ссылка
- Строка "Создано с Claude + Cursor за 1 день"
- Copyright

---

### UI компоненты (`src/components/ui/`)

#### `GlassCard.tsx`
```tsx
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'cyan' | 'violet' | 'green' | 'pink'
  hoverable?: boolean
}
```
Glassmorphism карточка. При `hoverable=true` — поднимается при hover с усилением glow.

#### `NeonButton.tsx`
```tsx
interface NeonButtonProps {
  children: React.ReactNode
  variant?: 'outline' | 'filled'
  color?: 'cyan' | 'violet' | 'green' | 'pink'
  onClick?: () => void
  className?: string
}
```

#### `GradientText.tsx`
```tsx
interface GradientTextProps {
  children: React.ReactNode
  from?: string  // tailwind color
  to?: string
  animate?: boolean  // анимированный gradient
}
```

#### `SectionLabel.tsx`
```tsx
interface SectionLabelProps {
  number: string   // "01"
  label: string    // "HERO"
}
```
Маленький бейдж в левом верхнем углу секции. Пример: `01 / HERO`

---

### Хуки (`src/hooks/`)

#### `useTheme.ts`
```ts
const { theme, toggleTheme, setTheme } = useTheme()
// theme: 'dark' | 'light'
// Сохраняет в localStorage, применяет data-theme к <html>
```

#### `useScrollProgress.ts`
```ts
const progress = useScrollProgress() // 0 → 1
// Используется для прогресс-бара в Navbar
```

#### `useStaggerAnimation.ts`
```ts
const { ref, controls } = useStaggerAnimation({ threshold: 0.2 })
// Возвращает ref для контейнера и controls для animate
```

---

### Библиотека анимаций (`src/lib/animations.ts`)

```ts
// Переиспользуемые варианты для Framer Motion

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } }
}

export const staggerContainer = (staggerChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren } }
})

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}
```

---

## Главная страница (`src/app/page.tsx`)

```tsx
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AnimationsSection />
      <InteractivitySection />
      <VisualEffectsSection />
      <ResponsiveSection />
      <FooterSection />
    </main>
  )
}
```

Просто и чисто. Вся логика внутри секций.

---

## Принципы архитектуры

1. **Секции независимы** — каждая секция самодостаточна, не зависит от других
2. **Атомарные UI компоненты** — GlassCard используется в нескольких секциях
3. **Хуки для логики** — вся нетривиальная логика вынесена в хуки
4. **Переиспользуемые анимации** — animations.ts предотвращает дублирование
5. **Масштабируемость** — новый блок = новый файл в `sections/`, добавить в `page.tsx`
