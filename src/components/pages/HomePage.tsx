'use client'

import HomeBanners from '@/components/layout/HomeBanners'
import HomeCategories from '@/components/layout/HomeCategories'

export default function HomePage() {
  return (
    <div className="grid h-full  w-full  grid-cols-[200px_1fr] grid-rows-1 gap-5 p-5 px-32">
      <div className="h-full w-full ">
        <HomeCategories />
      </div>
      <div className="h-full w-full">
        <HomeBanners />
      </div>
    </div>
  )
}
