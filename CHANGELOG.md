# Changelog

## 0.7.0

### Changed

- React 18 Strict Mode: immutable toast store, `useSyncExternalStore`, and hook-based transition timers with proper cleanup.
- **Peer dependencies** are now explicit: `react` / `react-dom` `^16.8.0 || ^17.0.0 || ^18.0.0`, `semantic-ui-react` `^2.1.3` (previously `semantic-ui-react` was `*`). Install a compatible Semantic UI React release if npm reports peer warnings after upgrading.

### Added

- Jest test suite (Strict Mode, auto-close, `maxToasts`, SSR snapshot).
- `onClick` is forwarded to Semantic UI `Message`.

### Notes

- When `maxToasts` is exceeded, the oldest toast is removed immediately (no close animation). This matches pre-0.7.0 behavior.
