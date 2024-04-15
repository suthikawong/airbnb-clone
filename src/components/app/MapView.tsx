import * as maptilersdk from '@maptiler/sdk'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react'

maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY!

interface MapViewProps {
  center?: maptilersdk.LngLatLike
  showMarker?: boolean
  allowMarked?: boolean
}

const MapView: React.FC<MapViewProps> = ({ center, showMarker = false, allowMarked = false }) => {
  const mapContainer = useRef(null)
  const map = useRef<maplibregl.Map | null>(null)
  const marker = useRef<maplibregl.Marker | null>(null)

  useEffect(() => {
    if (map?.current) return // stops map from intializing more than once
    if (!mapContainer?.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`,
      center: center || [-74.5, 40],
      zoom: 9,
    })

    // show mark at the center
    if (showMarker && center) {
      marker.current = new maplibregl.Marker({ color: '#FF0000' }).setLngLat(center).addTo(map.current!)
    }

    // show mark when click on map
    if (showMarker && allowMarked) {
      map.current.on('click', async (event) => {
        if (marker.current) marker.current.remove()
        const { lng, lat } = event.lngLat
        marker.current = new maplibregl.Marker({ color: '#FF0000' }).setLngLat([lng, lat]).addTo(map.current!)
        console.log('TLOG ~ marker.current:', marker.current)
        const results = await maptilersdk.geocoding.reverse([lng, lat])
        console.log('place name:', results.features?.[0]?.place_name_en)
      })
    }
  }, [allowMarked, center, showMarker])

  return (
    <div
      ref={mapContainer}
      className="absolute w-full h-[50vh]"
    />
  )
}

export default MapView
