import WarrantyDetail from '@/src/components/warranty/WarrantyDetail'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Warranty ${id}` }
}

export default async function WarrantyDetailPage({ params }: Props) {
  const { id } = await params
  return (
    <WarrantyDetail />
  )
}
