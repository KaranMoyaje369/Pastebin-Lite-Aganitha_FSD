import { kv } from '../../../lib/kv'
import { NextResponse } from 'next/server'
import { getCurrentTime } from '../../../lib/utils'
import { Paste } from '../../../lib/types'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { content, ttl_seconds, max_views } = body

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json({ error: 'Content is required and must be a non-empty string' }, { status: 400 })
    }

    if (ttl_seconds !== undefined && (typeof ttl_seconds !== 'number' || ttl_seconds < 1 || !Number.isInteger(ttl_seconds))) {
      return NextResponse.json({ error: 'ttl_seconds must be an integer >= 1' }, { status: 400 })
    }

    if (max_views !== undefined && (typeof max_views !== 'number' || max_views < 1 || !Number.isInteger(max_views))) {
      return NextResponse.json({ error: 'max_views must be an integer >= 1' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    const created_at = getCurrentTime(req)
    const paste: Paste = {
      id,
      content,
      created_at,
      ttl_seconds: ttl_seconds || null,
      max_views: max_views || null,
      views_count: 0
    }

    await kv.set(`paste:${id}`, JSON.stringify(paste))

    const url = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/p/${id}`

    return NextResponse.json({ id, url })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}