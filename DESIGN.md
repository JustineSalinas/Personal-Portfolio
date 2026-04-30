# Design System: Personal Portfolio

This document defines the design tokens and visual principles for the Personal Portfolio project, intended for synchronization with **Google Stitch**.

## 🎨 Visual Identity
- **Vibe**: Modern, Premium, Sleek, Data-Focused.
- **Theme**: Dark Mode (Pure Black background).
- **Aesthetic**: Minimalist glassmorphism with sharp typography and subtle accent glows.

## 🌈 Color Palette
- **Primary Background**: `#000000` (Black)
- **Surface**: `zinc-900/50` with `backdrop-blur-sm`
- **Borders**: `zinc-800`
- **Primary Text**: `white`
- **Secondary Text**: `zinc-400` / `zinc-300`
- **Accents**: 
  - `green-500` (Availability, Status, Highlights)
  - `zinc-700` (Interactive Hover States)

## 🔠 Typography
- **Font Family**: `Inter`, sans-serif (System stack).
- **Scale**:
  - **Hero Heading**: `text-4xl md:text-6xl`, font-extrabold.
  - **Section Heading**: `text-2xl`, font-bold.
  - **Body**: `text-base` / `text-lg`, leading-relaxed.
  - **Labels**: `text-xs`, font-medium, uppercase, tracking-wider.

## 📐 Layout & Spacing
- **Flow**: Linear top-to-bottom vertical rhythm.
- **Max Width**: `max-w-5xl`.
- **Gutter**: `p-4 md:p-8 lg:p-12`.
- **Gap**: `gap-12` between sections.
- **Border Radius**: `3xl` (24px) for primary containers.

## ✨ Motion & Interaction
- **Entrance**: `animate-fade-up` (0.5s ease-out, 20px vertical offset).
- **Hover**: 
  - Scale: `scale-[1.02]`
  - Ring: `ring-1 ring-zinc-700`
  - Color: Transition to `white` or `green-400`.

## 📦 Component Library
- **Card**: The base primitive. Rounded corners, subtle border, semi-transparent background.
- **Badge**: Rounded-full, zinc-800/50 background, used for tech tags.
- **Timeline**: Vertical border-l-2, dot indicators, achievement bullets.
