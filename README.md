# 🎨 Digital Color Meter

Pick and analyze colors from anywhere on screen

## Category
`system`

## Installation

```bash
npm install @anthropic/digital-color-meter
# or
pnpm add @anthropic/digital-color-meter
```

## Usage

```tsx
import App from '@anthropic/digital-color-meter';

function MyComponent() {
  return <App onClose={() => console.log('closed')} />;
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev
```

## zOS Integration

This app is designed to run within zOS, a web-based operating system. It follows the zOS app specification with:

- Standalone React component
- TypeScript support
- Tailwind CSS styling
- Window management integration

## License

MIT
