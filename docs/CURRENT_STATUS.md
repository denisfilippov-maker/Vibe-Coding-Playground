# CURRENT_STATUS.md — Прогресс и задачи

## Статус: 🟡 Планирование / Начало разработки

---

## План реализации по этапам

### Этап 0: Инициализация (30 мин)

- [ ] `npx create-next-app@latest vibe-coding-playground --typescript --tailwind --app`
- [ ] Установить зависимости: `framer-motion canvas-confetti clsx tailwind-merge @radix-ui/react-slider @radix-ui/react-switch`
- [ ] Установить шрифты в `layout.tsx` (Syne, DM_Sans, JetBrains_Mono)
- [ ] Настроить `tailwind.config.ts` — добавить кастомные цвета и анимации
- [ ] Настроить CSS переменные в `globals.css` (обе темы)
- [ ] Создать `src/lib/utils.ts` с функцией `cn()`
- [ ] Создать `src/lib/animations.ts` с базовыми вариантами

**Результат:** Пустой проект с правильной конфигурацией

---

### Этап 1: Основа (1-2 часа)

- [ ] `ThemeProvider.tsx` — контекст темы
- [ ] `useTheme.ts` — хук с localStorage
- [ ] `SectionWrapper.tsx` — обёртка секций
- [ ] `SectionLabel.tsx` — компонент метки
- [ ] `GradientText.tsx` — анимированный градиентный текст
- [ ] `Navbar.tsx` — навигация (появляется при скролле)

**Результат:** Скелет проекта готов

---

### Этап 2: Hero секция (1 час)

- [ ] Animated gradient background (CSS keyframes)
- [ ] Stagger анимация для букв заголовка
- [ ] Floating particles (20-30 точек с случайными траекториями)
- [ ] Parallax при движении мыши (useMotionValue + useTransform)
- [ ] Scroll indicator с пульсацией

**Результат:** Первый экран который "вау"

---

### Этап 3: Секция Animations (1 час)

- [ ] Grid из 6 карточек
- [ ] Каждая карточка — отдельный компонент с демо
- [ ] `useInView` для триггера при входе в viewport
- [ ] Кнопка "Replay All" (сброс и перезапуск анимаций)
- [ ] AnimatedCounter 0→100

**Результат:** Наглядная демонстрация возможностей Framer Motion

---

### Этап 4: Секция Interactivity (1 час)

- [ ] `ConfettiButton` с canvas-confetti
- [ ] `MorphButton` (idle → loading → success трансформация)
- [ ] `AnimatedSlider` с цветовым треком
- [ ] `ThemeToggle` (большой, красивый)
- [ ] `RippleButton` (кастомный ripple эффект)

**Результат:** Секция которую хочется "потыкать"

---

### Этап 5: Секция Visual Effects (1 час)

- [ ] GlassCard компонент
- [ ] Showcase 4-6 glassmorphism карточек на gradient bg
- [ ] Neon glow текст и элементы
- [ ] Aurora / gradient mesh анимация
- [ ] Noise texture (SVG filter)
- [ ] Hover color shifting cards

**Результат:** Визуально самая "богатая" секция

---

### Этап 6: Секция Responsive (45 мин)

- [ ] Device switcher (Desktop/Tablet/Mobile кнопки)
- [ ] Анимированный resize превью
- [ ] Breakpoint indicator
- [ ] Контент внутри превью адаптируется

**Результат:** Интерактивная демонстрация адаптивности

---

### Этап 7: Footer + Полировка (45 мин)

- [ ] Footer с CTA
- [ ] Проверить все анимации на mobile
- [ ] Оптимизировать производительность (lazy loading секций)
- [ ] Проверить темы (dark/light)
- [ ] Добавить meta теги и OG image

**Результат:** Готовый к деплою проект

---

### Этап 8: Деплой (15 мин)

- [ ] `git init && git add . && git commit -m "initial"`
- [ ] Создать репо на GitHub
- [ ] Подключить к Vercel
- [ ] `vercel --prod`

---

## Текущие задачи (следующие шаги)

1. **СЕЙЧАС:** Запустить Этап 0 — инициализация проекта
2. **ПОТОМ:** Этап 1 — базовые компоненты и провайдеры

---

## Известные сложности

| Проблема | Решение |
|---------|---------|
| Framer Motion увеличивает bundle | Использовать `LazyMotion` с `domAnimation` features |
| Конфетти не работает на SSR | Обернуть в `dynamic(() => ..., { ssr: false })` |
| Parallax лагает на mobile | Отключить parallax на `(hover: none)` media query |
| FOUC при смене темы | Inline script в `<head>` для чтения localStorage до рендера |

---

## Заметки для Cursor

При работе с этим проектом:
- Все анимации — через Framer Motion, не CSS transitions (исключение: простые hover)
- Цвета — только через CSS переменные (`var(--accent-cyan)`), не хардкодить
- Компоненты — строго TypeScript, все пропсы типизированы
- Импорты — абсолютные (`@/components/...`), не относительные
- `cn()` — всегда для объединения классов Tailwind
