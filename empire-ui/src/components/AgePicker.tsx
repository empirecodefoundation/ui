// Age Range Picker Component
// © The Empire Code Foundation
// Author: Krishna Gupta
// Open Source
'use client'
import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'

export default function AgePicker() {
  const [ageRange, setAgeRange] = useState([18, 30])

  const handleSliderChange = (value: number[]) => {
    setAgeRange(value)
  }

  return (
    <div className="w-[300px] p-4 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Age Range</h3>
        <div className="text-xs text-gray-500">
          <span className="font-medium text-primary">{ageRange[0]}</span>
          <span> - </span>
          <span className="font-medium text-primary">{ageRange[1]}</span>
          <span> years</span>
        </div>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[18, 30]}
        max={99}
        min={1}
        step={1}
        value={ageRange}
        onValueChange={handleSliderChange}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[2px]">
          <Slider.Range className="absolute bg-gradient-to-r from-primary to-primary-light rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-white border border-primary shadow-sm rounded-full hover:bg-primary/10 focus:outline-none focus:shadow-[0_0_0_3px] focus:shadow-primary/20 transition-colors"
          aria-label="Minimum age"
        />
        <Slider.Thumb
          className="block w-4 h-4 bg-white border border-primary shadow-sm rounded-full hover:bg-primary/10 focus:outline-none focus:shadow-[0_0_0_3px] focus:shadow-primary/20 transition-colors"
          aria-label="Maximum age"
        />
      </Slider.Root>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">1</span>
        <span className="text-xs text-gray-400">99</span>
      </div>
    </div>
  )
}