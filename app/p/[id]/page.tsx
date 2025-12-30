import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ViewPaste({ params }: PageProps) {
  const { id } = await params
  const res = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/pastes/${id}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    notFound()
  }

  const data = await res.json()

  return (
    <div className="container">
      <h1>Paste Content</h1>
      <pre>{data.content}</pre>
    </div>
  )
}