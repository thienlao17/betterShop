import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function MainHeader() {
  return (
    <div className="mx-auto flex h-12 w-full max-w-screen-2xl items-center justify-start gap-10 border-b px-16">
      <p className="text-lg">My shop</p>
      <div className="flex h-7 w-56 items-center overflow-hidden rounded-md border px-2">
        <input
          type="text"
          placeholder="Search product"
          className="h-full w-full bg-transparent pr-1 text-sm focus:outline-none"
        />
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
    </div>
  )
}
