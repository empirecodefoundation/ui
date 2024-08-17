import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'

export default function AgePickerMini() {
  const [ageRange, setAgeRange] = useState([6, 12])

  const handleSliderChange = (value: number[]) => {
    setAgeRange(value)
  }

  return (
    <div className="w-[250px] p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-center">Age Range</h3>
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-primary">
          {ageRange[0]} - {ageRange[1]} years
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[6, 12]}
        max={12}
        min={6}
        step={1}
        value={ageRange}
        onValueChange={handleSliderChange}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-secondary relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-md rounded-full hover:bg-primary focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-black/20"
          aria-label="Minimum age"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-md rounded-full hover:bg-primary focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-black/20"
          aria-label="Maximum age"
        />
      </Slider.Root>
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>6</span>
        <span>12</span>
      </div>
    </div>
  )
}