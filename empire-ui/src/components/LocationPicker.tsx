'use client'

import { useState, useCallback, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 40.7128,
  lng: -74.0060
}

export default function LocationPicker() {
  const [address, setAddress] = useState('')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [mapCenter, setMapCenter] = useState(center)
  const autocompleteRef = useRef(null)
  const mapRef = useRef(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  const handlePlaceSelect = () => {
    const autocomplete = autocompleteRef.current
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.geometry) {
        setSelectedPlace(place)
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    }
  }

  const handleInputChange = (e) => {
    setAddress(e.target.value)
  }

  const initAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Enter Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter an address"
              value={address}
              onChange={handleInputChange}
              className="w-full"
              id="address-input"
            />
          </div>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {selectedPlace && (
                <Marker
                  position={{
                    lat: selectedPlace.geometry.location.lat(),
                    lng: selectedPlace.geometry.location.lng()
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div>Loading map...</div>
          )}
          {selectedPlace && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Location:</h3>
              <p>{selectedPlace.formatted_address}</p>
            </div>
          )}
          <Button onClick={handlePlaceSelect} className="w-full">
            Confirm Location
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}