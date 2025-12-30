import { kv } from '../../../lib/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Simple check if KV is accessible
    await kv.set('health_check', 'ok')
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}