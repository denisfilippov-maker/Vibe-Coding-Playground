# CURRENT_STATUS.md — Прогресс и задачи

## Статус: 🚀 Задеплоен на сервер — готов к дальнейшей разработке

**Дата последнего обновления:** 24 марта 2026  
**GitHub:** https://github.com/denisfilippov-maker/Vibe-Coding-Playground  
**Dev-сервер:** `npm run dev` → http://localhost:3000  
**Production:** http://filidan.ru (VDS 45.146.167.101)

---

## Что уже сделано

### ✅ Этап 0: Инициализация
- [x] Next.js 14.2 (App Router) + TypeScript + Tailwind CSS v3
- [x] Установлены все зависимости: `framer-motion`, `canvas-confetti`, `clsx`, `tailwind-merge`, `@radix-ui/react-slider`, `@radix-ui/react-switch`
- [x] Шрифты в `layout.tsx` — Syne, DM_Sans, JetBrains_Mono через `next/font/google`
- [x] `tailwind.config.ts` — кастомные цвета, анимации, box-shadow neon
- [x] CSS переменные в `globals.css` — тёмная и светлая тема полностью
- [x] `src/lib/utils.ts` — функция `cn()` (clsx + tailwind-merge)
- [x] `src/lib/animations.ts` — переиспользуемые варианты Framer Motion
- [x] `next.config.mjs`, `tsconfig.json`, `postcss.config.js`, `.gitignore`, `.eslintrc.json`

### ✅ Этап 1: Основа
- [x] `ThemeProvider.tsx` — React Context, localStorage, `data-theme` на `<html>`
- [x] `useTheme.ts` — хук для доступа к теме
- [x] `useScrollProgress.ts` — прогресс скролла 0→1
- [x] `useStaggerAnimation.ts` — хук InView + AnimationControls
- [x] `SectionWrapper.tsx` — обёртка секций
- [x] `SectionLabel.tsx` — бейдж "01 / HERO"
- [x] `GradientText.tsx` — градиентный текст с опциональной анимацией
- [x] `NeonButton.tsx` — кнопка с неон-эффектом (outline/filled, 4 цвета)
- [x] `GlassCard.tsx` — glassmorphism карточка с hover glow
- [x] `AnimatedCounter.tsx` — счётчик с spring-анимацией
- [x] `Navbar.tsx` — навигация (появляется при скролле), прогресс-бар

### ✅ Этап 2: Hero секция
- [x] Animated gradient background — 3 плавающих blob
- [x] Stagger анимация для букв заголовка (char by char)
- [x] Floating particles (24 точки, случайные траектории)
- [x] Parallax при движении мыши (`useMotionValue` + `useTransform` + spring)
- [x] Scroll indicator с анимацией

### ✅ Этап 3: Секция Animations
- [x] Grid из 6 карточек, каждая — своя уникальная анимация:
  - Fade In (только opacity)
  - Slide Up (y: 80px)
  - Scale (scale 0.2→1 с backOut)
  - Rotate Y (90°→0, видно без perspective)
  - Spring (x: -60px + stiffness 300, damping 10)
  - SVG Path (pathLength 0→1)
- [x] Кнопка "Replay" — `controls.start('hidden')` → 120ms → `controls.start('visible')`
- [x] AnimatedCounter (spring, InView)

### ✅ Этап 4: Секция Interactivity
- [x] `ConfettiButton` — canvas-confetti с origin от позиции клика
- [x] `MorphButton` — idle → loading (spinner) → success (checkmark)
- [x] `AnimatedSlider` — Radix UI Slider, цвет трека меняется через hue
- [x] `ThemeToggle` — анимированный day/night переключатель
- [x] `RippleButton` — кастомный ripple (AnimatePresence + scale)
- [x] Счётчик кликов

### ✅ Этап 5: Секция Visual Effects
- [x] Glassmorphism showcase — 4 карточки на gradient background
- [x] Neon glow текст — hover усиливает textShadow
- [x] Aurora effect — анимированный градиент через Framer Motion
- [x] Gradient mesh + SVG noise (feTurbulence + hue-rotate)

### ✅ Этап 6: Секция Responsive
- [x] Device switcher (Desktop / Tablet / Mobile)
- [x] Анимированный resize превью (spring transition)
- [x] Breakpoint legend (default, sm, md, lg, xl)

### ✅ Этап 7: Footer
- [x] Watermark текст "VIBE" на фоне
- [x] CTA блок с кнопками
- [x] Строка "Создано с Claude + Cursor за 1 день"

### ✅ Этап 8: Git + Деплой на VDS
- [x] Первый коммит — 40 файлов, 9358 строк
- [x] Подключён GitHub: https://github.com/denisfilippov-maker/Vibe-Coding-Playground
- [x] VDS сервер: Ubuntu 24.04 LTS (45.146.167.101)
- [x] Установлено: Node.js 20 LTS, nginx, pm2
- [x] Репозиторий склонирован в `/var/www/vibe-coding-playground`
- [x] Проект собран (`next build`) — HTTP 200 ✓
- [x] Приложение запущено через pm2 (порт 3000, статус: online)
- [x] nginx настроен как reverse proxy для filidan.ru
- [x] pm2 и nginx добавлены в автозапуск

---

## Текущие задачи (следующие шаги)

1. **SSL/HTTPS** — настроить Let's Encrypt через certbot для filidan.ru
2. **CI/CD** — GitHub Actions для автодеплоя при push в main
3. **Полировка мобильной версии** — проверить Hero parallax на touch-устройствах
4. **OG Image** — добавить `public/og-image.png` для соцсетей
5. **Оптимизация** — `LazyMotion` для уменьшения bundle size

## Инфраструктура сервера

| Компонент | Значение |
|-----------|---------|
| VDS IP | 45.146.167.101 |
| ОС | Ubuntu 24.04 LTS |
| Node.js | v20.20.1 |
| npm | 10.8.2 |
| pm2 | 6.0.14 |
| nginx | system (Ubuntu repo) |
| Путь проекта | `/var/www/vibe-coding-playground` |
| Порт приложения | 3000 |
| pm2 app name | `vibe-coding` |
| Домен | filidan.ru (Cloudflare) |

---

## Известные проблемы / Tech Debt

| Проблема | Статус | Решение |
|---------|--------|---------|
| Parallax на mobile | 🟡 Не проверено | Отключить на `(hover: none)` media query |
| Conffetti SSR | ✅ Работает | `'use client'` + динамический import не нужен |
| FOUC при смене темы | ✅ Минимизирован | `suppressHydrationWarning` + `data-theme` на html |
| `next.config.ts` → `.mjs` | ✅ Исправлено | Next.js 14 не поддерживает `.ts` конфиг |

---

## Соглашения проекта (для Cursor)

- Все анимации — через Framer Motion (`motion.*`), не CSS transitions (исключение: простые hover)
- Цвета — только через CSS переменные (`var(--accent-cyan)`), не хардкодить Tailwind-цвета напрямую
- Компоненты — строго TypeScript, все пропсы типизированы через `interface`
- Импорты — абсолютные (`@/components/...`), не относительные
- `cn()` — всегда для объединения классов Tailwind
- `'use client'` — на всех компонентах с хуками, анимациями, обработчиками событий
- Секции независимы — новый блок = новый файл в `sections/`, добавить в `page.tsx`
