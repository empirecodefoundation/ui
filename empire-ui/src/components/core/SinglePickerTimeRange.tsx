import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ClockIcon } from 'lucide-react'

type Time = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
}

export default function SinglePickerTimeRange() {
  const [startTime, setStartTime] = useState<Time>({ hour: 9, minute: 0, period: 'AM' })
  const [endTime, setEndTime] = useState<Time>({ hour: 5, minute: 0, period: 'PM' })
  const [isSelectingStart, setIsSelectingStart] = useState(true)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)

  const currentTime = isSelectingStart ? startTime : endTime
  const setCurrentTime = isSelectingStart ? setStartTime : setEndTime

  const handleHourClick = (selectedHour: number) => {
    setCurrentTime(prev => ({ ...prev, hour: selectedHour }))
  }

  const handleMinuteChange = (value: number[]) => {
    setCurrentTime(prev => ({ ...prev, minute: value[0] }))
  }

  const togglePeriod = () => {
    setCurrentTime(prev => ({ ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' }))
  }

  const formatTime = (time: Time) => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')} ${time.period}`
  }

  return (
    <Card className="w-[300px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
            <div className="text-lg font-semibold">Time Range</div>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant={isSelectingStart ? "default" : "outline"}
              onClick={() => setIsSelectingStart(true)}
            >
              Start
            </Button>
            <Button 
              size="sm" 
              variant={!isSelectingStart ? "default" : "outline"}
              onClick={() => setIsSelectingStart(false)}
            >
              End
            </Button>
          </div>
        </div>
        <div className="text-2xl font-bold mb-4 text-center">
          {formatTime(currentTime)}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {hours.map((h) => (
            <Button
              key={h}
              onClick={() => handleHourClick(h)}
              variant={currentTime.hour === h ? "default" : "outline"}
              size="sm"
            >
              {h}
            </Button>
          ))}
        </div>
        <Slider
          min={0}
          max={59}
          step={1}
          value={[currentTime.minute]}
          onValueChange={handleMinuteChange}
          className="my-4"
        />
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Minutes: {currentTime.minute}
          </div>
          <Button 
            onClick={togglePeriod}
            variant="outline"
            size="sm"
            className="w-14"
          >
            {currentTime.period}
          </Button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Range: {formatTime(startTime)} - {formatTime(endTime)}
        </div>
      </CardContent>
    </Card>
  )
}