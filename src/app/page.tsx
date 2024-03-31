'use client'

import Wrapper from '@/components/app/Wrapper'
import FilterMenu from '@/components/app/header/FilterMenu'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // const handleScroll = debounce(() => {
    //   if (!isScrolling) {
    //     const sections = document.querySelectorAll('.section')
    //     sections.forEach(section => {
    //       if (isElementInViewport(section as HTMLElement)) {
    //         setSelected(() => section.id)
    //       }
    //     })
    //   }
    // }, 500); // Adjust this value as needed
    const handleScroll = () => {
      const position = window.scrollY
      console.log(position)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="h-[1400px]">
      <Wrapper>
        <FilterMenu className="hidden md:block" />
        Home Content
      </Wrapper>
    </div>
  )
}
