import { kv } from '../../../../lib/kv'
import { NextResponse } from 'next/server'
import { getCurrentTime } from '../../../../lib/utils'
import { Paste } from '../../../../lib/types'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const pasteStr = await kv.get(`paste:${id}`)
    if (!pasteStr) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 })
    }

    const paste: Paste = JSON.parse(pasteStr as string)
    const current_time = getCurrentTime(req)

    // Check TTL
    if (paste.ttl_seconds && current_time > paste.created_at + paste.ttl_seconds * 1000) {
      return NextResponse.json({ error: 'Paste expired' }, { status: 404 })
    }

    // Check views
    if (paste.max_views && paste.views_count >= paste.max_views) {
      return NextResponse.json({ error: 'View limit exceeded' }, { status: 404 })
    }

    // Increment views
    paste.views_count += 1
    await kv.set(`paste:${id}`, JSON.stringify(paste))

    const remaining_views = paste.max_views ? paste.max_views - paste.views_count : null
    const expires_at = paste.ttl_seconds ? new Date(paste.created_at + paste.ttl_seconds * 1000).toISOString() : null

    return NextResponse.json({
      content: paste.content,
      remaining_views,
      expires_at
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}