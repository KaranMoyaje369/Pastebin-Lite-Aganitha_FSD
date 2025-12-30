# Pastebin-Lite Project Plan

## Overview
Build a Pastebin-like application using Next.js and Vercel KV for persistence. Users can create text pastes with optional TTL and view limits, and share links to view them.

## Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Persistence**: Vercel KV (Redis-compatible key-value store)
- **Deployment**: Vercel
- **Language**: TypeScript

## System Architecture
- **Frontend**: React components for create and view pages
- **Backend**: Next.js API routes for CRUD operations
- **Storage**: Vercel KV for paste data persistence
- **Deployment**: Serverless functions on Vercel

## Data Model
```typescript
interface Paste {
  id: string;
  content: string;
  created_at: number; // timestamp in ms
  ttl_seconds: number | null;
  max_views: number | null;
  views_count: number;
}
```

## API Routes
1. `GET /api/healthz`
   - Returns `{ "ok": true }`
   - Validates KV connectivity

2. `POST /api/pastes`
   - Body: `{ content: string, ttl_seconds?: number, max_views?: number }`
   - Returns: `{ id: string, url: string }`

3. `GET /api/pastes/[id]`
   - Returns: `{ content: string, remaining_views: number | null, expires_at: string | null }`
   - Increments view count
   - Returns 404 if constraints violated

## UI Pages
1. **Home Page** (`app/page.tsx`)
   - Form with textarea for content
   - Optional inputs for TTL and max views
   - Submit creates paste and displays shareable URL

2. **View Page** (`app/p/[id]/page.tsx`)
   - Displays paste content in `<pre>` tag
   - Returns 404 if paste unavailable

## Implementation Steps
1. Initialize Next.js project with TypeScript
2. Set up Vercel KV integration
3. Implement API routes
4. Create UI components and pages
5. Add constraint logic (TTL and view limits)
6. Implement deterministic time handling for testing
7. Test locally and deploy to Vercel
8. Ensure compliance with repository guidelines

## Key Features
- **Paste Creation**: Generate unique IDs, store in KV
- **Constraint Handling**: TTL expiry and view count limits
- **Deterministic Testing**: Support `TEST_MODE` and `x-test-now-ms` header
- **Safe Rendering**: Text-only content display
- **Error Handling**: Proper HTTP status codes and JSON responses

## Deployment Checklist
- [ ] Create GitHub repository
- [ ] Push code to repo
- [ ] Connect to Vercel
- [ ] Configure Vercel KV
- [ ] Deploy and test endpoints
- [ ] Verify automated test scenarios

## README Requirements
- Project description
- Local run instructions
- Persistence layer note (Vercel KV)
- Any notable design decisions