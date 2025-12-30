export interface Paste {
  id: string
  content: string
  created_at: number
  ttl_seconds: number | null
  max_views: number | null
  views_count: number
}