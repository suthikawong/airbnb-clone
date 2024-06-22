import RatingStar from '@/components/icons/RatingStar'
import { Card, CardContent } from '@/components/ui/card'
import dayjs from 'dayjs'
import React from 'react'
import ImageSlider from './ImageSlider'

interface PlaceCardProps {
  data: any
}

const PlaceCard: React.FC<PlaceCardProps> = ({ data }) => {
  return (
    <Card className="cursor-pointer rounded-xl border-0 shadow-none">
      <CardContent className="p-0">
        <ImageSlider images={data.images} />
        <div className="flex justify-between">
          <h4 className="line-clamp-1 text-[15px] font-semibold text-neutral-800">
            {data?.placeName}, {data?.country}
          </h4>

          <div className="flex items-center gap-1 text-[15px] text-neutral-800">
            <RatingStar />
            <span>{data?.rating}</span>
          </div>
        </div>
        <p className="text-[15px] text-neutral-500">
          {data?.distance} kilometers away
        </p>
        <p>
          <span className="text-[15px] text-neutral-500">
            {dayjs(data?.startDate).format('MMM D')}
          </span>{' '}
          -{' '}
          <span className="text-[15px] text-neutral-500">
            {dayjs(data?.endDate).format('MMM D')}
          </span>
        </p>
        <p className="text-[15px] text-neutral-800">
          <span className="font-medium">{data?.price}</span> night
        </p>
      </CardContent>
    </Card>
  )
}

export default PlaceCard
