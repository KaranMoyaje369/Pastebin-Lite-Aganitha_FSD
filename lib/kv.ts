import { kv as vercelKV } from '@vercel/kv'

// Mock KV for local development
const store = new Map<string, string>()

const mockKV = {
  get: async (key: string) => store.get(key) || null,
  set: async (key: string, value: string) => { store.set(key, value) }
}

export const kv = process.env.KV_URL ? vercelKV : mockKV