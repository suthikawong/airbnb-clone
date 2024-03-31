import SearchIconDesktop from '@/components/icons/SearchIconDesktop'
import { Separator } from '@/components/ui/separator'
import React from 'react'

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="flex justify-center hover:cursor-pointer">
      <div className="flex-1 rounded-full border shadow-md max-w-[848px] flex items-center">
        <div className="order-1 peer/where rounded-full flex basis-2/6 hover:bg-base-gray">
          <div className="pl-8 py-3.5">
            <div className="text-xs text-base-primary font-semibold pb-0.5">Where</div>
            <div className="text-sm text-base-secondary">Search destinations</div>
          </div>
        </div>
        <div className="order-3 peer/check-in rounded-full flex basis-1/6 hover:bg-base-gray">
          <div className="pl-6 py-3.5">
            <div className="text-xs text-base-primary font-semibold pb-0.5">Check in</div>
            <div className="text-sm text-base-secondary">Add dates</div>
          </div>
        </div>
        <div className="order-5 peer/check-out rounded-full flex basis-1/6 hover:bg-base-gray">
          <div className="pl-6 py-3.5">
            <div className="text-xs text-base-primary font-semibold pb-0.5">Check out</div>
            <div className="text-sm text-base-secondary">Add dates</div>
          </div>
        </div>
        <div className="order-7 peer/who pr-[9px] rounded-full flex basis-2/6 items-center hover:bg-base-gray">
          <div className="pl-8 py-3.5 flex flex-col flex-1">
            <div className="text-xs text-base-primary font-semibold pb-0.5">Who</div>
            <div className="text-sm text-base-secondary">Add guests</div>
          </div>
          <div className="bg-primary size-12 rounded-full flex items-center justify-center">
            <SearchIconDesktop className="text-white" />
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="order-2 peer-hover/where:opacity-0 peer-hover/check-in:opacity-0 h-8"
        />
        <Separator
          orientation="vertical"
          className="order-4 peer-hover/check-in:opacity-0 peer-hover/check-out:opacity-0 h-8"
        />
        <Separator
          orientation="vertical"
          className="order-6 peer-hover/check-out:opacity-0 peer-hover/who:opacity-0 h-8"
        />
      </div>
    </div>
  )
}

export default SearchBar
