import SearchIconDesktop from '@/components/icons/SearchIconDesktop'
import { Separator } from '@/components/ui/separator'
import React from 'react'

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="flex justify-center">
      <div className="flex max-w-[848px] flex-1 items-center rounded-full border shadow-md hover:cursor-pointer">
        <div className="peer/where order-1 flex basis-2/6 rounded-full hover:bg-base-gray">
          <div className="py-3.5 pl-8">
            <div className="pb-0.5 text-xs font-semibold text-base-primary">
              Where
            </div>
            <div className="text-sm text-base-secondary">
              Search destinations
            </div>
          </div>
        </div>
        <div className="peer/check-in order-3 flex basis-1/6 rounded-full hover:bg-base-gray">
          <div className="py-3.5 pl-6">
            <div className="pb-0.5 text-xs font-semibold text-base-primary">
              Check in
            </div>
            <div className="text-sm text-base-secondary">Add dates</div>
          </div>
        </div>
        <div className="peer/check-out order-5 flex basis-1/6 rounded-full hover:bg-base-gray">
          <div className="py-3.5 pl-6">
            <div className="pb-0.5 text-xs font-semibold text-base-primary">
              Check out
            </div>
            <div className="text-sm text-base-secondary">Add dates</div>
          </div>
        </div>
        <div className="peer/who order-7 flex basis-2/6 items-center rounded-full pr-[9px] hover:bg-base-gray">
          <div className="flex flex-1 flex-col py-3.5 pl-8">
            <div className="pb-0.5 text-xs font-semibold text-base-primary">
              Who
            </div>
            <div className="text-sm text-base-secondary">Add guests</div>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full bg-primary">
            <SearchIconDesktop className="text-white" />
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="order-2 h-8 peer-hover/check-in:opacity-0 peer-hover/where:opacity-0"
        />
        <Separator
          orientation="vertical"
          className="order-4 h-8 peer-hover/check-in:opacity-0 peer-hover/check-out:opacity-0"
        />
        <Separator
          orientation="vertical"
          className="order-6 h-8 peer-hover/check-out:opacity-0 peer-hover/who:opacity-0"
        />
      </div>
    </div>
  )
}

export default SearchBar
