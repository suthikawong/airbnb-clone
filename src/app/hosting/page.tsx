'use client'

import { createRoom } from '@/api/room'
import { CreateRoomSchema, CreateRoomType } from '@/api/room/types'
import MapView from '@/components/app/MapView'
import Wrapper from '@/components/app/Wrapper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as maptilersdk from '@maptiler/sdk'
import { useMutation } from '@tanstack/react-query'
import maplibregl from 'maplibre-gl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const HostingPage = () => {
  const form = useForm<CreateRoomType>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: '',
      country: '',
      lat: undefined,
      lng: undefined,
      imageIds: [],
      maxGuests: 0,
      bedroomNumber: 0,
      bedNumber: 0,
      bathNumber: 0,
      price: 0,
      detail: '',
      maxReservation: 0,
      allowAnimal: false,
      // ownerId: '4ce7195a-af9a-48cf-bf5f-3a2d50e7b7ec',
    },
  })

  const [mapLoading, setMapLoading] = useState(false)

  const { mutateAsync: mutateCreateRoom, isPending } = useMutation({
    mutationFn: createRoom,
  })

  const onSubmit: SubmitHandler<CreateRoomType> = async (data) => {
    try {
      await mutateCreateRoom(data)
      toast.success('Room saved')
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const onSelectLocation = (coors: maplibregl.LngLat, result: maptilersdk.GeocodingFeature) => {
    const { lat, lng } = coors
    const country = result.context?.[result.context?.length - 1]?.text_en
    if (country) {
      form.setValue('lat', lat)
      form.setValue('lng', lng)
      form.setValue('country', country)
    }
  }

  return (
    <Wrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 relative"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Guests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedroomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedroom Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bed Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bath Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxReservation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Reservation</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowAnimal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allow Animal</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="ml-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={() => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <MapView
                    showMarker
                    allowMarked
                    onChange={onSelectLocation}
                    setLoading={setMapLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending || mapLoading}
          >
            Create Room
          </Button>
        </form>
      </Form>
    </Wrapper>
  )
}

export default HostingPage
