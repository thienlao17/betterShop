'use client'

import HomeCategories from '@/components/layout/HomeCategories'

export default function HomePage() {
  return (
    <div className="mt-5 grid h-full  w-full  grid-cols-[200px_1fr] grid-rows-1 gap-5 px-32">
      <div className="h-full w-full ">
        <HomeCategories />
      </div>
      <div className="h-full w-full">Second</div>
    </div>
  )
}
