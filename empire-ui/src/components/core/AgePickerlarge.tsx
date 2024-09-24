import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'

export default function AgePickerlarge() {
  const [ageRange, setAgeRange] = useState([18, 30])

  const handleSliderChange = (value: number[]) => {
    setAgeRange(value)
  }

  return (
    <div className="w-[300px] p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Age Range Selection</h3>
      <div className="mb-6">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold text-primary">{ageRange[0]}</span>
          <span className="text-sm text-gray-500">to</span>
          <span className="text-3xl font-bold text-primary">{ageRange[1]}</span>
        </div>
        <div className="text-center mt-1">
          <span className="text-sm text-gray-600">years old</span>
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
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-gradient-to-r from-primary to-primary-light rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary shadow-md rounded-full hover:bg-primary/10 focus:outline-none focus:shadow-[0_0_0_4px] focus:shadow-primary/20 transition-colors"
          aria-label="Minimum age"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary shadow-md rounded-full hover:bg-primary/10 focus:outline-none focus:shadow-[0_0_0_4px] focus:shadow-primary/20 transition-colors"
          aria-label="Maximum age"
        />
      </Slider.Root>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>1</span>
        <span>99</span>
      </div>
    </div>
  )
}