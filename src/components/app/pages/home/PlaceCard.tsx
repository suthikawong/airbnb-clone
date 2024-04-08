import RatingStar from '@/components/icons/RatingStar'
import { Card, CardContent } from '@/components/ui/card'
import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'

interface PlaceCardProps {
  data: any
}

const PlaceCard: React.FC<PlaceCardProps> = ({ data }) => {
  return (
    <Card className="rounded-xl border-0 shadow-none cursor-pointer">
      <CardContent className="p-0">
        <Image
          src={data?.images[0]}
          alt={`${data?.placeName} image`}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded-xl"
        />
        <div className="flex justify-between">
          <h4 className="line-clamp-1 font-semibold text-[15px] text-neutral-800">
            {data?.placeName}, {data?.country}
          </h4>

          <div className="text-[15px] text-neutral-800 flex items-center gap-1">
            <RatingStar />
            <span>{data?.rating}</span>
          </div>
        </div>
        <p className="text-[15px] text-neutral-500">{data?.distance} kilometers away</p>
        <p>
          <span className="text-[15px] text-neutral-500">{dayjs(data?.startDate).format('MMM D')}</span> -{' '}
          <span className="text-[15px] text-neutral-500">{dayjs(data?.endDate).format('MMM D')}</span>
        </p>
        <p className="text-[15px] text-neutral-800">
          <span className="font-medium">{data?.price}</span> night
        </p>
      </CardContent>
    </Card>
  )
}

export default PlaceCard
