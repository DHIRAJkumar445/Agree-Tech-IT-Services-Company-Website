# Agreetech Solution - Smart Farming

A smart agriculture platform with **PHP** and **Node.js** backends.

## Quick Start

### Option 1: Node.js (Recommended)

```bash
npm install
npm start
```

Open http://localhost:3000

### Option 2: PHP

```bash
php -S localhost:8000
```

Open http://localhost:8000

## Backend Features

| Feature | PHP | Node.js |
|---------|-----|---------|
| Contact form | `api/contact.php` | `POST /api/contact` |
| Weather API | - | `GET /api/weather` |
| Crop recommendation | - | `POST /api/recommend-crop` |

## Contact Form

Messages are saved to the `messages/` folder as JSON files.

- **Node.js**: Saves to `messages/contact_*.json`
- **PHP**: Saves to `messages/contact_*.json`

## Project Structure

```
agreetech solution/
├── api/
│   └── contact.php      # PHP contact handler
├── css/
├── js/
├── messages/            # Saved contact form submissions
├── server.js            # Node.js Express server
├── package.json
└── *.html
```
