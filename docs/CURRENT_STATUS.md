# CURRENT_STATUS.md — Прогресс и задачи

## Статус: 🏁 v1.0 — Production Ready

**Дата последнего обновления:** 25 марта 2026  
**GitHub:** https://github.com/denisfilippov-maker/Vibe-Coding-Playground  
**Dev-сервер:** `npm run dev` → http://localhost:3000  
**Production:** https://filidan.ru (VDS 45.146.167.101)

---

## Деплой на сервер — быстрая инструкция

```bash
# На сервере (после push в main):
ssh root@45.146.167.101
cd /var/www/vibe-coding-playground
git pull && npm run build && pm2 restart vibe-coding
```

---

## Что уже сделано

### ✅ Инициализация проекта
- [x] Next.js 14.2 (App Router) + TypeScript + Tailwind CSS v3
- [x] Зависимости: `framer-motion`, `canvas-confetti`, `clsx`, `tailwind-merge`, `@radix-ui/react-slider`, `@radix-ui/react-switch`
- [x] Шрифты: Syne (display), DM_Sans (body), JetBrains_Mono (mono) — через `next/font/google`
- [x] `tailwind.config.ts` — кастомные цвета (CSS vars), анимации, neon box-shadow
- [x] `globals.css` — CSS переменные тёмной и светлой темы, glass/neon утилиты
- [x] `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- [x] `src/lib/animations.ts` — варианты Framer Motion (fadeInUp, scaleIn, slideIn, springIn, rotateIn, staggerContainer)
- [x] `next.config.mjs`, `tsconfig.json`, `postcss.config.js`, `.gitignore`, `.eslintrc.json`

### ✅ Базовые компоненты и провайдеры
- [x] `ThemeProvider.tsx` — React Context, localStorage, `data-theme` на `<html>`
- [x] `useTheme.ts` — хук доступа к теме
- [x] `useScrollProgress.ts` — прогресс скролла 0→1
- [x] `useStaggerAnimation.ts` — InView + AnimationControls
- [x] `SectionWrapper.tsx` — обёртка секций (max-w-7xl, padding)
- [x] `SectionLabel.tsx` — бейдж "01 / HERO"
- [x] `GradientText.tsx` — градиентный текст с опциональной анимацией
- [x] `NeonButton.tsx` — outline/filled, 4 акцентных цвета
- [x] `GlassCard.tsx` — glassmorphism, hover glow
- [x] `AnimatedCounter.tsx` — spring-счётчик, InView триггер
- [x] `Navbar.tsx` — появляется при скролле, прогресс-бар сверху

### ✅ HeroSection (01)
- [x] 3 анимированных blob-а (violet / cyan / pink)
- [x] 28 floating particles — mix всех 4 акцентных цветов
- [x] Stagger по буквам — `titleVariants` с `custom (i: number)` factory
- [x] Parallax на движение мыши (`useMotionValue` + `useTransform` + spring)
- [x] Scroll indicator — пульсирующие двойные стрелки вниз
- [x] **Фикс:** шрифт `font-bold` (700) вместо `font-black` (900), размер до `text-7xl`

### ✅ AnimationsSection (02)
- [x] 6 карточек с визуально разными анимациями:
  - Fade In (только opacity 0→1)
  - Slide Up (y: 80px → 0)
  - Scale (scale 0.2→1, backOut easing)
  - Rotate Y (90°→0)
  - Spring (x: -60px + stiffness 300, damping 10 — bouncy)
  - SVG Path (pathLength 0→1)
- [x] Кнопка "Replay" — `controls.start('hidden')` → 120ms → `controls.start('visible')`
- [x] **AnimatedCounter 0→100** (по архитектуре: "счётчик 0→100 при входе в viewport")

### ✅ InteractivitySection (03)
- [x] `ConfettiButton` — canvas-confetti с origin от позиции клика
- [x] `MorphButton` — idle → loading spinner → success checkmark
- [x] `AnimatedSlider` — Radix UI, цвет трека через HSL hue
- [x] `ThemeToggle` — анимированный day/night переключатель
- [x] `RippleButton` — кастомный Material-like ripple (AnimatePresence)
- [x] **Анимированный счётчик кликов** — digit-flip через `AnimatePresence mode="popLayout"` (y: -20→0→20)

### ✅ VisualEffectsSection (04)
- [x] Glassmorphism showcase — 4 карточки на gradient background
- [x] Neon glow текст — textShadow усиливается при hover
- [x] Aurora effect — анимированный градиент (Framer Motion background)
- [x] Gradient mesh + SVG noise (feTurbulence + hue-rotate)
- [x] **Hover Color Shift** — 4 карточки с плавной сменой акцентного цвета, glow и подъёмом при hover

### ✅ ResponsiveSection (05)
- [x] Device switcher (Desktop / Tablet / Mobile)
- [x] Анимированный preview (spring transition по ширине)
- [x] Breakpoint legend (default, sm, md, lg, xl)

### ✅ FooterSection (06)
- [x] **Watermark "Vibe Coding Playground"** (полное название, по архитектуре), `9vw`, opacity 0.04
- [x] CTA блок с кнопками
- [x] **GitHub — реальная ссылка** на репозиторий (target="_blank")
- [x] "Создано с Claude + Cursor за 1 день"
- [x] **Copyright © 2026**

### ✅ Инфраструктура и деплой
- [x] GitHub: https://github.com/denisfilippov-maker/Vibe-Coding-Playground
- [x] VDS: Ubuntu 24.04 LTS, Node.js 20.20.1, nginx, pm2 6.0.14
- [x] Nginx — reverse proxy, Cloudflare real IP (CF-Connecting-IP)
- [x] SSL — Cloudflare Origin Certificate (RSA 2048, валиден до 2041)
- [x] SSL режим: Full (Cloudflare → origin по HTTPS)
- [x] pm2 + nginx — автозапуск при перезагрузке сервера

---

## Что сделано в v1.0

### ✅ Мобильная полировка (iOS Safari)
- [x] Заголовок Hero: `whitespace-nowrap` на каждое слово — больше нет разрыва "Pla/yground"
- [x] Smooth scroll с `scroll-padding-top: 72px` и JS-обработчиком для точного офсета
- [x] Navbar: активная секция подсвечивается через `IntersectionObserver`
- [x] Все transitions: 200ms → 300ms для более плавного ощущения
- [x] DevicePreview: `max-w-full` предотвращает переполнение 600px на 375px экране
- [x] Neon Glow: добавлен `whileTap` — работает на тач-устройствах
- [x] Hover Color Shift: `onClick` toggle вместо hover-only — работает на iOS
- [x] AnimatedCounter: `replayKey` для сброса счётчика при нажатии Replay
- [x] AnimatedCounter: `amount: 0` для надёжного срабатывания на iOS

---

## Возможные следующие шаги (backlog)

1. **CI/CD** — GitHub Actions: автоматический деплой при push в `main`
2. **Полировка Hero на mobile** — отключить parallax на `(hover: none)` устройствах
3. **OG Image** — добавить `public/og-image.png` для превью в соцсетях
4. **Оптимизация** — `LazyMotion` с `domAnimation` для уменьшения bundle

---

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
| SSL | Cloudflare Origin Cert (до 2041) + режим Full |
| nginx real IP | CF-Connecting-IP + все IP-диапазоны Cloudflare |

---

## Известные проблемы / Tech Debt

| Проблема | Статус | Решение |
|---------|--------|---------|
| Parallax на mobile (touch) | 🟡 Не проверено | Отключить на `@media (hover: none)` |
| Hero заголовок — перенос строк | ✅ Исправлено | `font-bold` + `text-7xl` max |
| Scroll indicator — не виден | ✅ Исправлено | 32px chevron, strokeWidth 2.5 |
| `next.config.ts` → `.mjs` | ✅ Исправлено | Next.js 14 не поддерживает `.ts` конфиг |
| FOUC при смене темы | ✅ Минимизирован | `suppressHydrationWarning` + `data-theme` на html |

---

## Соглашения проекта (для Cursor)

- Анимации — через Framer Motion (`motion.*`), не CSS transitions (исключение: простые hover)
- Цвета — только CSS переменные (`var(--accent-cyan)`), не хардкодить Tailwind напрямую
- Компоненты — TypeScript, все пропсы через `interface`
- Импорты — абсолютные (`@/components/...`)
- `cn()` — всегда для объединения Tailwind-классов
- `'use client'` — обязательно на компонентах с хуками/событиями/анимациями
- Секции независимы — новый блок = файл в `sections/` + строка в `page.tsx`
- Деплой — `git push` → вручную `git pull && npm run build && pm2 restart` на сервере
