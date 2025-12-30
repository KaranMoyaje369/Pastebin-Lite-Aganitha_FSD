// Mock KV for local development
const store = new Map<string, string>()

export const kv = {
  get: async (key: string) => store.get(key) || null,
  set: async (key: string, value: string) => { store.set(key, value) }
}