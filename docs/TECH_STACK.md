# TECH_STACK.md — Технологический стек

## Выбор стека

### Next.js 14 (App Router) — основной фреймворк

**Почему:** Оптимальный выбор для showcase-проекта:
- SSG (Static Site Generation) → молниеносная загрузка
- Отличная поддержка TypeScript из коробки
- `next/font` — загрузка шрифтов без FOUC
- `next/image` — автооптимизация изображений
- Деплой на Vercel в 1 клик

### TypeScript — типизация

**Почему:** Cursor лучше работает с TypeScript — автодополнение точнее, рефакторинг надёжнее. Для showcase это особенно важно при работе с пропсами анимационных компонентов.

### Tailwind CSS v3 — стили

**Почему:**
- Идеально для итеративной разработки с AI
- Utility-first = Cursor точно знает что писать
- JIT-компилятор → минимальный CSS в продакшене
- Кастомные значения через `tailwind.config.ts`

### Framer Motion v11 — анимации

**Почему:** Лучшая библиотека анимаций для React:
- `motion` компоненты с декларативным API
- `useInView` + `whileInView` для scroll-triggered анимаций
- `AnimatePresence` для mount/unmount анимаций
- `useMotionValue` + `useTransform` для parallax
- Варианты анимаций для stagger эффектов
- Встроенная поддержка physics (spring animations)

### canvas-confetti — конфетти эффект

**Почему:** Лёгкая (< 5kb), без зависимостей, идеальна для одного эффекта в блоке Interactivity.

### Shadcn/ui — базовые UI компоненты

**Почему:** Слайдеры, переключатели — берём готовые accessible компоненты и стилизуем под наш дизайн. Не весь shadcn, только нужные примитивы.

### clsx + tailwind-merge — утилиты

**Почему:** Чистое объединение классов Tailwind без конфликтов.

---

## Полные зависимости

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "canvas-confetti": "^1.9.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-switch": "^1.0.3"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/node": "^20.0.0",
    "@types/canvas-confetti": "^1.6.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## Шрифты (Google Fonts через next/font)

```ts
// Заголовки — экспрессивный, запоминающийся
import { Syne } from 'next/font/google' // Display font

// Тело — читаемый, современный
import { DM_Sans } from 'next/font/google' // Body font

// Акценты / код — моноширинный с характером
import { JetBrains_Mono } from 'next/font/google' // Mono font
```

**Почему именно эти:**
- `Syne` — геометрический, смелый, отлично смотрится на больших размерах
- `DM_Sans` — нейтральный но характерный, не надоедает при чтении
- `JetBrains_Mono` — знаком разработчикам, усиливает "кодинг" тему

---

## Цветовая палитра

### Тёмная тема (по умолчанию)

```css
:root[data-theme="dark"] {
  /* Фоны */
  --bg-base: #050508;          /* Почти чёрный с синим оттенком */
  --bg-elevated: #0d0d14;      /* Карточки, секции */
  --bg-glass: rgba(255,255,255,0.04); /* Glassmorphism */

  /* Акцентные цвета */
  --accent-cyan: #00f5ff;      /* Основной неон */
  --accent-violet: #9d4edd;    /* Фиолетовый */
  --accent-green: #39ff14;     /* Неоновый зелёный */
  --accent-pink: #ff006e;      /* Горячий розовый */

  /* Текст */
  --text-primary: #f0f0ff;     /* Почти белый с холодным оттенком */
  --text-secondary: #8888aa;   /* Приглушённый */
  --text-muted: #44445a;       /* Очень приглушённый */

  /* Границы */
  --border: rgba(255,255,255,0.08);
  --border-accent: rgba(0,245,255,0.3);

  /* Градиенты */
  --gradient-hero: radial-gradient(ellipse at 20% 50%, #9d4edd22 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 20%, #00f5ff18 0%, transparent 50%),
                   radial-gradient(ellipse at 60% 80%, #ff006e12 0%, transparent 40%);
}
```

### Светлая тема

```css
:root[data-theme="light"] {
  --bg-base: #f8f8ff;
  --bg-elevated: #ffffff;
  --bg-glass: rgba(0,0,0,0.03);

  --accent-cyan: #0066cc;
  --accent-violet: #7c3aed;
  --accent-green: #16a34a;
  --accent-pink: #db2777;

  --text-primary: #0a0a1a;
  --text-secondary: #555577;
  --text-muted: #aaaacc;

  --border: rgba(0,0,0,0.08);
  --border-accent: rgba(0,102,204,0.3);
}
```

---

## Деплой

**Vercel** — стандарт для Next.js проектов:
```bash
vercel --prod
```
Или через GitHub Actions при пуше в `main`.
