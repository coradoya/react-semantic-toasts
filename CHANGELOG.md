# Changelog

## 0.7.0

### Changed

- React 18 Strict Mode: immutable toast store, `useSyncExternalStore`, and hook-based transition timers with proper cleanup.
- **Peer dependencies** are now explicit: `react` / `react-dom` `^18.0.0 || ^19.0.0`, `semantic-ui-react` `^2.1.3` (previously `semantic-ui-react` was `*`). React 16 and 17 are no longer supported because the published build is compiled with React Compiler (`target: '18'`). Install a compatible Semantic UI React release if npm reports peer warnings after upgrading.
- Library build output is compiled with React Compiler for automatic memoization; `react-compiler-runtime` is a direct dependency.

### Added

- Jest test suite (Strict Mode, auto-close, `maxToasts`, SSR snapshot).
- Compiled-build smoke test (`npm run test:compiled`).
- ESLint `plugin:react-hooks/recommended-latest` for React Compiler rule coverage.
- `onClick` is forwarded to Semantic UI `Message`.

### Notes

- When `maxToasts` is exceeded, the oldest toast is removed immediately (no close animation). This matches pre-0.7.0 behavior.
