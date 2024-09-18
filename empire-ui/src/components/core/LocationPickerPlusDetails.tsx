'use client'

import { useState, useCallback, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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

export default function LocationPickerPlusDetails() {
  const [address, setAddress] = useState('')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [mapCenter, setMapCenter] = useState(center)
  const [detailedAddress, setDetailedAddress] = useState('')
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

  const handleDetailedAddressChange = (e) => {
    setDetailedAddress(e.target.value)
  }

  const initAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }

  const handleConfirmLocation = () => {
    if (selectedPlace) {
      const fullAddress = detailedAddress
        ? `${selectedPlace.formatted_address}\n${detailedAddress}`
        : selectedPlace.formatted_address
      setSelectedPlace({
        ...selectedPlace,
        formatted_address: fullAddress
      })
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Enter Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address-input">Search Address</Label>
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="detailed-address">Detailed Address Information</Label>
              <Textarea
                id="detailed-address"
                placeholder="Enter additional details (e.g., Room 24, Behind Starbucks)"
                value={detailedAddress}
                onChange={handleDetailedAddressChange}
                className="w-full h-24"
              />
            </div>
            <Button onClick={handleConfirmLocation} className="w-full">
              Confirm Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}