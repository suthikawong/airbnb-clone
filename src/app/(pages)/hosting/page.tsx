'use client'

import { createRoom } from '@/app/_actions/room'
import { CreateRoomSchema, CreateRoomType } from '@/app/_actions/room/types'
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
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL!
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET!

const HostingPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const form = useForm<CreateRoomType>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: '',
      country: '',
      lat: undefined,
      lng: undefined,
      images: [],
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
      const form = new FormData()
      const newImageUrls = []

      for (let i = 0; i < imageFiles.length; i++) {
        form.append('file', imageFiles[i])
        form.append('cloud_name', cloudName)
        form.append('upload_preset', uploadPreset)
        const res = await fetch(`${cloudinaryUrl}/${cloudName}/image/upload`, {
          method: 'post',
          body: form,
        })
        const imageData = await res.json()
        const imageUrl = imageData.url.toString()
        newImageUrls.push(imageUrl.split('/image/upload/')[1])
      }
      data.images = newImageUrls.map((path) => ({ path }))

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

  const onSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = (event.target as HTMLInputElement).files
    if (!rawFiles) return

    const files = Array.from(rawFiles)
    setImageFiles(files)
    setPreviewImages(files.map((file) => URL.createObjectURL(file)))
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
          <FormItem>
            <FormLabel>Upload Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                accept="image/jpeg, image/jpg, image/png, image/webp"
                onChange={onSelectFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <div className="flex gap-4 ">
            {previewImages.map((url, index) => (
              <div
                key={index}
                className="p-2 border border-solid rounded-lg"
              >
                <div className="relative size-28">
                  <Image
                    alt="image"
                    src={url}
                    layout="fill"
                  />
                </div>
              </div>
            ))}
          </div>

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
