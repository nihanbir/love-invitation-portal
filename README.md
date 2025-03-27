
# Wedding Website

A wedding website for Ale and Nihan's special day.

## Development

To run the project locally, you need to add the following scripts to your package.json:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
}
```

After adding these scripts, you can run:

```bash
npm run dev
```

to start the development server.

## Features

- Wedding details and information
- RSVP system with authentication
- Gallery of photos
- Contact information
