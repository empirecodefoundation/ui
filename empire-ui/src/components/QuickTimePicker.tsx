import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ClockIcon } from 'lucide-react'

export default function QuickTimePicker() {
  const [hour, setHour] = useState(12)
  const [minute, setMinute] = useState(0)
  const [period, setPeriod] = useState('AM')

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)

  const handleHourClick = (selectedHour: number) => {
    setHour(selectedHour)
  }

  const handleMinuteChange = (value: number[]) => {
    setMinute(value[0])
  }

  const togglePeriod = () => {
    setPeriod(prev => prev === 'AM' ? 'PM' : 'AM')
  }

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-[300px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <ClockIcon className="w-6 h-6 text-muted-foreground" />
          <div className="text-2xl font-bold">
            {formatTime(hour, minute)} {period}
          </div>
          <Button 
            onClick={togglePeriod}
            variant="outline"
            size="sm"
            className="w-14"
          >
            {period}
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {hours.map((h) => (
            <Button
              key={h}
              onClick={() => handleHourClick(h)}
              variant={hour === h ? "default" : "outline"}
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
          value={[minute]}
          onValueChange={handleMinuteChange}
          className="my-4"
        />
        <div className="text-center text-sm text-muted-foreground">
          Minutes: {minute}
        </div>
      </CardContent>
    </Card>
  )
}