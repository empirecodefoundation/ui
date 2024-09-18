/**
 * Author: Krishna Krishna
 * Copyright © 2023 Empire Code Foundation. All rights reserved.
 */

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClockIcon, PlusIcon, XIcon } from 'lucide-react'

type TimeRange = {
  start: { hour: number; minute: number; period: 'AM' | 'PM' };
  end: { hour: number; minute: number; period: 'AM' | 'PM' };
}

export default function RapidTimePicker() {
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { start: { hour: 9, minute: 0, period: 'AM' }, end: { hour: 5, minute: 0, period: 'PM' } }
  ])

  const addTimeRange = () => {
    const lastRange = timeRanges[timeRanges.length - 1]
    const newStart = { ...lastRange.end }
    let newEnd = { ...newStart, hour: (newStart.hour % 12) + 1 }
    if (newEnd.hour === 12) newEnd.period = newEnd.period === 'AM' ? 'PM' : 'AM'
    setTimeRanges([...timeRanges, { start: newStart, end: newEnd }])
  }

  const removeTimeRange = (index: number) => {
    setTimeRanges(timeRanges.filter((_, i) => i !== index))
  }

  const updateTime = (rangeIndex: number, isStart: boolean, field: keyof TimeRange['start'], increment: number) => {
    setTimeRanges(prevRanges => {
      const newRanges = [...prevRanges]
      const timeObj = isStart ? newRanges[rangeIndex].start : newRanges[rangeIndex].end
      
      if (field === 'hour') {
        timeObj.hour = ((timeObj.hour + increment - 1 + 12) % 12) + 1
      } else if (field === 'minute') {
        timeObj.minute = (timeObj.minute + increment + 60) % 60
      } else if (field === 'period') {
        timeObj.period = timeObj.period === 'AM' ? 'PM' : 'AM'
      }

      // Ensure end time is not earlier than start time
      const start = newRanges[rangeIndex].start
      const end = newRanges[rangeIndex].end
      const startMinutes = (start.hour % 12) * 60 + start.minute + (start.period === 'PM' ? 720 : 0)
      const endMinutes = (end.hour % 12) * 60 + end.minute + (end.period === 'PM' ? 720 : 0)

      if (endMinutes <= startMinutes) {
        end.hour = (start.hour % 12) + 1
        end.minute = start.minute
        end.period = start.period
        if (end.hour === 12) end.period = end.period === 'AM' ? 'PM' : 'AM'
      }

      return newRanges
    })
  }

  const TimeButton = ({ value, onClick, className = "" }: { value: string | number, onClick: () => void, className?: string }) => (
    <Button 
      size="sm" 
      variant="ghost" 
      onClick={onClick} 
      className={`h-7 min-w-[2rem] p-0 text-xs font-medium hover:bg-muted ${className}`}
    >
      {value}
    </Button>
  )

  return (
    <Card className="w-[280px] shadow-md">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <div className="text-sm font-semibold">Time Ranges</div>
          </div>
          <Button size="sm" onClick={addTimeRange} className="h-7 w-7 p-0 bg-green-500 hover:bg-green-600 text-white">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        {timeRanges.map((range, index) => (
          <div key={index} className={`flex items-center justify-between mb-1 p-1 rounded-sm ${index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}`}>
            <div className="flex items-center space-x-0.5">
              <TimeButton value={range.start.hour.toString().padStart(2, '0')} onClick={() => updateTime(index, true, 'hour', 1)} />
              <span className="text-muted-foreground">:</span>
              <TimeButton value={range.start.minute.toString().padStart(2, '0')} onClick={() => updateTime(index, true, 'minute', 15)} />
              <TimeButton value={range.start.period} onClick={() => updateTime(index, true, 'period', 1)} className="text-primary w-8" />
            </div>
            <span className="text-muted-foreground mx-0.5">-</span>
            <div className="flex items-center space-x-0.5">
              <TimeButton value={range.end.hour.toString().padStart(2, '0')} onClick={() => updateTime(index, false, 'hour', 1)} />
              <span className="text-muted-foreground">:</span>
              <TimeButton value={range.end.minute.toString().padStart(2, '0')} onClick={() => updateTime(index, false, 'minute', 15)} />
              <TimeButton value={range.end.period} onClick={() => updateTime(index, false, 'period', 1)} className="text-primary w-8" />
            </div>
            {index > 0 && (
              <Button size="sm" variant="ghost" onClick={() => removeTimeRange(index)} className="h-7 w-7 p-0 ml-0.5 text-red-500 hover:text-red-700 hover:bg-red-100">
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}