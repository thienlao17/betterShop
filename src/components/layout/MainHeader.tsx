import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import HeaderFunctions from '@/components/layout/HeaderFunctions'

export default function MainHeader() {
  return (
    <header className=" z-40 flex justify-center  px-5">
      <div className="flex h-16 w-full max-w-screen-xl items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-bold">Better</p>
        </Link>
        <nav className="flex flex-row items-center">
          <ul className="inline-flex items-center space-x-2 md:space-x-4">
            <div>
              <HeaderFunctions />
            </div>
            <div>
              <Link href="/cart">
                <ShoppingCartIcon />
              </Link>
            </div>

            <div>
              <Link href="/profile">
                <AccountBoxIcon />
              </Link>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )
}
