import CategoryPage from '@/components/pages/CategoryPage'

export default function Page({ params }: { params: { categoryId: string } }) {
  const parsedParam = parseInt(params.categoryId, 10)
  const categoryId = Number.isNaN(parsedParam) ? 0 : parsedParam
  return <CategoryPage categoryId={categoryId} />
}
