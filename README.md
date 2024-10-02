# Comuline X

Comuline X is a complete rewrite of [@comuline/web](https://github.com/comuline/web) using React and [Vite](https://vitejs.dev/).

## Features

- **Offline Support**: Access train schedule without an internet connection (powered by PWA).
- **Reminders (Android Only)**: Set reminder notifications for incoming trains.
- **More**: Additional features and improvements are coming soon!

## Development

To start the development server, run:

```bash
pnpm dev
```

Sync apps to Capacitor(Mobile)

```bash
pnpm build #build webapp first
npx cap sync #sync to mobile code
```

Read more about Capacitor https://capacitorjs.com/docs/
