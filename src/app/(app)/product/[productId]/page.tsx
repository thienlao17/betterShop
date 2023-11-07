import ProductPage from '@/components/pages/ProductPage'

export default function Page({ params }: { params: { productId: string } }) {
  const parsedParam = parseInt(params.productId, 10)
  const productId = Number.isNaN(parsedParam) ? 0 : parsedParam
  return <ProductPage productId={productId} />
}
