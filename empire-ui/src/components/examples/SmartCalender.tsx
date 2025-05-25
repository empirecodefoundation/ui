"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Plus, 
  X, 
  Loader2, 
  Check, 
  AlertCircle,
  Sparkles,
  Globe,
  RefreshCw
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
  confidence: number;
  conflicts?: string[];
  timezone?: string;
}

interface Meeting {
  id: string;
  title: string;
  attendees: string[];
  duration: number; // in minutes
  date?: Date;
  timeSlots?: TimeSlot[];
  location?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface AICalendarProps {
  attendees?: string[];
  onAISuggest?: (times: TimeSlot[]) => void;
  onMeetingScheduled?: (meeting: Meeting) => void;
  className?: string;
  apiKey?: string;
  model?: string;
}

export const AICalendar = ({
  attendees = [],
  onAISuggest,
  onMeetingScheduled,
  className,
  apiKey = "AIzaSyDIgil7Utyc91uRuCk99FxpY1yGka-CcNk",
  model = "gemini-1.5-flash",
}: AICalendarProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedTimes, setSuggestedTimes] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userTimezone, setUserTimezone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock existing meetings for conflict detection
  const existingMeetings: Meeting[] = [
    {
      id: "1",
      title: "Team Standup",
      attendees: ["john@example.com", "jane@example.com"],
      duration: 30,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    },
    {
      id: "2", 
      title: "Client Call",
      attendees: ["client@example.com"],
      duration: 60,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    }
  ];

  useEffect(() => {
    // Detect user timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  const parseNaturalLanguage = async (query: string): Promise<{
    title: string;
    duration: number;
    preferredTimes: Date[];
    attendees: string[];
    location?: string;
    priority?: 'low' | 'medium' | 'high';
  }> => {
    if (!apiKey) {
      // Fallback parsing without Gemini
      return parseQueryLocally(query);
    }

    try {
      const prompt = `
Parse this meeting request into structured data:
Query: "${query}"
Current time: ${new Date().toISOString()}
User timezone: ${userTimezone}

Extract:
1. Meeting title/subject
2. Duration (default 60 minutes if not specified)  
3. Preferred date/time (convert relative terms like "tomorrow", "next week", "Monday")
4. Attendees (email addresses)
5. Location (if mentioned)
6. Priority level (low/medium/high based on urgency words)

Handle natural language like:
- "lunch next Thursday" → Thursday at 12:00 PM
- "team meeting tomorrow at 2pm" → Tomorrow at 2:00 PM  
- "call with john@company.com Friday morning" → Friday at 9:00 AM
- "quick standup in 30 minutes" → 30 minutes from now, 15 min duration

Return only valid JSON:
{
  "title": "string",
  "duration": number,
  "preferredTimes": ["ISO date strings"],
  "attendees": ["email addresses"],
  "location": "string or null",
  "priority": "low|medium|high"
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) throw new Error("Invalid response from Gemini API");
      
      const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanedResponse);
      
      return {
        title: parsed.title || "New Meeting",
        duration: parsed.duration || 60,
        preferredTimes: parsed.preferredTimes?.map((time: string) => new Date(time)) || [],
        attendees: parsed.attendees || [],
        location: parsed.location,
        priority: parsed.priority || 'medium'
      };
    } catch (error) {
      console.error("Gemini parsing error:", error);
      return parseQueryLocally(query);
    }
  };

  const parseQueryLocally = (query: string): {
    title: string;
    duration: number;
    preferredTimes: Date[];
    attendees: string[];
    location?: string;
    priority?: 'low' | 'medium' | 'high';
  } => {
    const lowerQuery = query.toLowerCase();
    
    // Extract duration
    let duration = 60; // default
    const durationMatch = lowerQuery.match(/(\d+)\s*(min|minutes|hour|hours|hr)/);
    if (durationMatch) {
      const num = parseInt(durationMatch[1]);
      const unit = durationMatch[2];
      duration = unit.startsWith('h') ? num * 60 : num;
    }

    // Quick meetings
    if (lowerQuery.includes('quick') || lowerQuery.includes('brief')) {
      duration = 15;
    }

    // Extract title
    let title = "New Meeting";
    if (lowerQuery.includes('lunch')) title = "Lunch Meeting";
    else if (lowerQuery.includes('standup')) title = "Team Standup";
    else if (lowerQuery.includes('call')) title = "Call";
    else if (lowerQuery.includes('review')) title = "Review Meeting";
    else if (lowerQuery.includes('interview')) title = "Interview";

    // Extract emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const extractedEmails = query.match(emailRegex) || [];

    // Parse relative times
    const preferredTimes: Date[] = [];
    const now = new Date();
    
    if (lowerQuery.includes('tomorrow')) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 0, 0, 0); // Default 2 PM
      preferredTimes.push(tomorrow);
    }
    
    if (lowerQuery.includes('next week')) {
      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);
      nextWeek.setHours(10, 0, 0, 0); // Default 10 AM
      preferredTimes.push(nextWeek);
    }

    // Extract time if specified
    const timeMatch = lowerQuery.match(/(\d{1,2})\s*(am|pm|:)/);
    if (timeMatch && preferredTimes.length > 0) {
      const hour = parseInt(timeMatch[1]);
      const isPM = lowerQuery.includes('pm');
      const adjustedHour = isPM && hour !== 12 ? hour + 12 : hour;
      preferredTimes[0].setHours(adjustedHour, 0, 0, 0);
    }

    // Determine priority
    let priority: 'low' | 'medium' | 'high' = 'medium';
    if (lowerQuery.includes('urgent') || lowerQuery.includes('asap')) {
      priority = 'high';
    } else if (lowerQuery.includes('when convenient') || lowerQuery.includes('flexible')) {
      priority = 'low';
    }

    return {
      title,
      duration,
      preferredTimes,
      attendees: [...attendees, ...extractedEmails],
      priority
    };
  };

  const generateTimeSlots = (
    preferredTimes: Date[], 
    duration: number,
    attendeeList: string[]
  ): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const now = new Date();

    // If no preferred times, suggest next few days
    if (preferredTimes.length === 0) {
      for (let i = 1; i <= 3; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        date.setHours(10, 0, 0, 0); // 10 AM
        preferredTimes.push(date);
      }
    }

    preferredTimes.forEach((prefTime, index) => {
      // Generate multiple options around preferred time
      const baseSlots = [
        new Date(prefTime), // Exact preferred time
        new Date(prefTime.getTime() - 60 * 60 * 1000), // 1 hour before
        new Date(prefTime.getTime() + 60 * 60 * 1000), // 1 hour after
        new Date(prefTime.getTime() + 2 * 60 * 60 * 1000), // 2 hours after
      ];

      baseSlots.forEach((startTime, slotIndex) => {
        // Skip past times
        if (startTime < now) return;

        const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
        
        // Check for conflicts
        const conflicts = checkConflicts(startTime, endTime, attendeeList);
        
        // Calculate confidence based on conflicts and time preference
        let confidence = 1.0;
        if (conflicts.length > 0) confidence -= 0.3;
        if (slotIndex > 0) confidence -= slotIndex * 0.1; // Prefer exact time
        
        // Business hours boost
        const hour = startTime.getHours();
        if (hour >= 9 && hour <= 17) confidence += 0.1;

        slots.push({
          id: `slot-${index}-${slotIndex}`,
          start: startTime,
          end: endTime,
          confidence: Math.max(0.1, confidence),
          conflicts,
          timezone: userTimezone
        });
      });
    });

    // Sort by confidence and return top options
    return slots
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 6);
  };

  const checkConflicts = (startTime: Date, endTime: Date, attendeeList: string[]): string[] => {
    const conflicts: string[] = [];
    
    existingMeetings.forEach(meeting => {
      if (!meeting.date) return;
      
      const meetingEnd = new Date(meeting.date.getTime() + meeting.duration * 60 * 1000);
      
      // Check time overlap
      if (startTime < meetingEnd && endTime > meeting.date) {
        // Check attendee overlap
        const hasConflictingAttendee = attendeeList.some(attendee => 
          meeting.attendees.includes(attendee)
        );
        
        if (hasConflictingAttendee) {
          conflicts.push(`Conflicts with "${meeting.title}"`);
        }
      }
    });

    return conflicts;
  };

  const handleScheduleRequest = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setShowSuggestions(true);

    try {
      // Parse the natural language input
      const parsed = await parseNaturalLanguage(input);
      
      // Generate time slots
      const timeSlots = generateTimeSlots(
        parsed.preferredTimes,
        parsed.duration,
        parsed.attendees
      );

      setSuggestedTimes(timeSlots);
      onAISuggest?.(timeSlots);

      // Create meeting object
      const meeting: Meeting = {
        id: `meeting-${Date.now()}`,
        title: parsed.title,
        attendees: parsed.attendees,
        duration: parsed.duration,
        timeSlots,
        location: parsed.location,
        priority: parsed.priority
      };

      setMeetings(prev => [...prev, meeting]);

    } catch (error) {
      console.error("Scheduling error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    
    // Find the meeting and update it with selected time
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.timeSlots?.some(slot => slot.id === timeSlot.id)) {
        const updatedMeeting = {
          ...meeting,
          date: timeSlot.start
        };
        onMeetingScheduled?.(updatedMeeting);
        return updatedMeeting;
      }
      return meeting;
    });
    
    setMeetings(updatedMeetings);
    setShowSuggestions(false);
    setInput("");
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString([], { 
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-50";
    if (confidence >= 0.6) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return "border-red-200 bg-red-50";
      case 'low': return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-white";
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          AI Calendar Scheduler
        </h2>
        <p className="text-gray-600">
          Schedule meetings with natural language - "Lunch next Thursday", "Team call tomorrow at 2pm"
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Globe className="h-4 w-4" />
          <span>Timezone: {userTimezone}</span>
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"  
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScheduleRequest()}
            placeholder="Try: 'Lunch with john@company.com tomorrow at 1pm' or 'Team standup Monday morning'"
            className={cn(
              "w-full pl-10 pr-4 py-4 rounded-xl border border-gray-300 bg-white",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "placeholder:text-gray-500 text-gray-900 text-lg",
              "transition-all duration-200 ease-in-out shadow-sm"
            )}
          />
        </div>

        <motion.button
          onClick={handleScheduleRequest}
          disabled={!input.trim() || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full py-3 px-6 rounded-xl font-medium transition-all duration-200",
            "flex items-center justify-center gap-2",
            input.trim() && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
          {isLoading ? "Analyzing..." : "Schedule Meeting"}
        </motion.button>
      </motion.div>

      {/* Suggested Time Slots */}
      <AnimatePresence>
        {showSuggestions && suggestedTimes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Suggested Times
              </h3>
              <motion.button
                onClick={() => setShowSuggestions(false)}
                whileHover={{ scale: 1.1 }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </motion.button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {suggestedTimes.map((timeSlot, index) => (
                <motion.div
                  key={timeSlot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTimeSlotSelect(timeSlot)}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedTimeSlot?.id === timeSlot.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {formatDate(timeSlot.start)}
                      </span>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getConfidenceColor(timeSlot.confidence)
                      )}>
                        {Math.round(timeSlot.confidence * 100)}% match
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {formatTime(timeSlot.start)} - {formatTime(timeSlot.end)}
                    </div>

                    {timeSlot.conflicts && timeSlot.conflicts.length > 0 && (
                      <div className="flex items-start gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>{timeSlot.conflicts[0]}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{timeSlot.timezone}</span>
                      {selectedTimeSlot?.id === timeSlot.id && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scheduled Meetings */}
      {meetings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Scheduled Meetings
          </h3>

          <div className="space-y-3">
            {meetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-4 rounded-lg border-2",
                  getPriorityColor(meeting.priority)
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                      {meeting.date && (
                        <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                          <span>{formatDate(meeting.date)} at {formatTime(meeting.date)}</span>
                          <span>{meeting.duration} minutes</span>
                        </div>
                      )}
                    </div>
                    {meeting.priority && (
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        meeting.priority === 'high' ? 'bg-red-100 text-red-800' :
                        meeting.priority === 'low' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      )}>
                        {meeting.priority}
                      </span>
                    )}
                  </div>

                  {meeting.attendees.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{meeting.attendees.join(", ")}</span>
                    </div>
                  )}

                  {meeting.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{meeting.location}</span>
                    </div>
                  )}

                  {!meeting.date && meeting.timeSlots && (
                    <div className="text-sm text-orange-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Awaiting time selection</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Example Queries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 rounded-xl p-6 space-y-3"
      >
        <h4 className="font-medium text-gray-900">Try these examples:</h4>
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Lunch with sarah@company.com tomorrow at 1pm",
            "Team standup Monday morning 15 minutes",
            "Client review next Thursday afternoon",
            "Quick call with john@email.com in 2 hours",
            "Weekly sync next week with team@company.com",
            "Interview with candidate@email.com Friday 2pm"
          ].map((example, index) => (
            <motion.button
              key={example}
              onClick={() => setInput(example)}
              whileHover={{ scale: 1.02 }}
              className="text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-sm"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AICalendar;