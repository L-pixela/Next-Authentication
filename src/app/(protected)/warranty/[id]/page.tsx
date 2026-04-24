import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Warranty ${id}` }
}

export default async function WarrantyDetailPage({ params }: Props) {
  const { id } = await params
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Warranty Detail</h1>
      <p className="text-sm text-gray-500">Warranty ID: {id}</p>
    </section>
  )
}
