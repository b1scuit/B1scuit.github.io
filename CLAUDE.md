# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview the production build locally

## Project Architecture

This is a React + TypeScript + Vite application with a standard single-page app structure:

- **Entry Point**: `src/main.tsx` renders the root App component
- **Main Component**: `src/App.tsx` contains the primary application logic
- **Styling**: Uses CSS modules with `src/App.css` and `src/index.css`
- **Assets**: Static assets stored in `src/assets/` and `public/`

## Key Configuration Files

- **vite.config.ts**: Vite configuration with React plugin
- **tsconfig.json**: TypeScript project references to app and node configs
- **eslint.config.js**: ESLint configuration with TypeScript, React hooks, and React refresh rules
- **package.json**: Uses ES modules (`"type": "module"`)

## Build System

- Uses Vite as the build tool and dev server
- TypeScript compilation happens before Vite build (`tsc -b && vite build`)
- ESLint configured for TypeScript and React with modern flat config format
- No test framework currently configured

## Deployment

This appears to be set up for GitHub Pages deployment (based on repository name ending in `.github.io`).