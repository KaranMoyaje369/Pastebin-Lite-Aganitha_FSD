# Pastebin-Lite 📝

A modern, lightweight pastebin application built with Next.js and Vercel KV. Create text pastes with optional time-to-live (TTL) and view count limits, then share them via unique URLs.

![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Features

- **Create Pastes**: Share text content with optional constraints
- **Time Limits**: Set TTL for automatic expiry
- **View Limits**: Restrict number of accesses
- **Shareable Links**: Unique URLs for instant sharing
- **Responsive UI**: Works perfectly on desktop and mobile
- **Safe Rendering**: XSS-protected content display
- **Deterministic Testing**: Environment-based time control for automated tests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pastebin-lite.git
   cd pastebin-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

> **Note**: For full persistence functionality, deploy to Vercel. Local development uses in-memory storage.

## 📋 Usage

### Creating a Paste
1. Visit the home page
2. Enter your text content
3. Optionally set TTL (seconds) and max views
4. Click "Create Paste"
5. Copy the generated URL or use the share buttons

### Viewing a Paste
- Click the shared link to view the paste
- Pastes automatically expire based on constraints
- Content is safely rendered without script execution

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Styling**: Custom CSS with responsive design
- **Database**: Vercel KV (Redis-compatible)
- **Deployment**: Vercel (serverless)

### Project Structure
```
pastebin-lite/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── healthz/       # Health check
│   │   ├── pastes/        # Paste CRUD
│   │   └── pastes/[id]/   # Individual paste access
│   ├── p/[id]/            # Paste viewing pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility libraries
│   ├── kv.ts             # KV storage abstraction
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
└── README.md             # This file
```

## 🔌 API Documentation

### Health Check
```http
GET /api/healthz
```
Returns application health status.
```json
{
  "ok": true
}
```

### Create Paste
```http
POST /api/pastes
Content-Type: application/json

{
  "content": "string",
  "ttl_seconds": 3600,
  "max_views": 10
}
```
Creates a new paste and returns shareable URL.
```json
{
  "id": "uuid",
  "url": "https://your-app.vercel.app/p/uuid"
}
```

### Get Paste
```http
GET /api/pastes/:id
```
Returns paste data (counts as a view).
```json
{
  "content": "paste content",
  "remaining_views": 9,
  "expires_at": "2024-01-01T00:00:00.000Z"
}
```

### View Paste (HTML)
```http
GET /p/:id
```
Returns HTML page displaying the paste content.

## 🧪 Testing

### Automated Testing
The application supports deterministic time for automated tests:
```bash
TEST_MODE=1
x-test-now-ms: 1640995200000
```

### Manual Testing
1. Create pastes with different constraints
2. Test expiry behavior
3. Verify view limits
4. Check responsive design

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect Repository**
   - Import your GitHub repo to Vercel
   - Framework preset: Next.js

2. **Configure KV Storage**
   - Add Vercel KV database in project settings
   - Environment variables are auto-configured

3. **Deploy**
   - Automatic deployments on git push
   - Custom domain support available

### Environment Variables
Vercel automatically provides KV connection details. No manual configuration needed.

## 🎨 Design Decisions

- **Next.js App Router**: Modern React features with server components
- **TypeScript**: Type safety and better developer experience
- **Vercel KV**: Serverless Redis for instant scaling
- **Responsive CSS**: Mobile-first design without external libraries
- **API-First**: Clean separation between frontend and backend
- **Constraint Logic**: Efficient expiry checking with minimal database calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Aganitha Cognitive Solutions FSD take-home assignment
- Inspired by the simplicity of pastebin services
- Powered by Next.js and Vercel ecosystem

---

**Happy pasting!** 🎉