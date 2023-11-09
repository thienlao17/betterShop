import Link from 'next/link'

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-40 flex justify-center border-2 px-5">
      <div className="flex h-16 w-full max-w-screen-xl items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-bold">Better</p>
        </Link>
        <nav className="flex flex-row items-center">
          <ul className="inline-flex items-center space-x-2 md:space-x-4">
            <div>Cart</div>
            <div>Functions</div>
            <div>Profile</div>
          </ul>
        </nav>
      </div>
    </header>
  )
}
