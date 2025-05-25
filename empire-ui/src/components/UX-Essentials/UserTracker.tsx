'use client';

import { useEffect, useRef } from 'react';

interface ClickData {
  timestamp: string;
  elementType: string;
  elementText: string;
  elementId?: string;
  elementClass?: string;
  pageUrl: string;
  userAgent: string;
  coordinates: {
    x: number;
    y: number;
  };
  sessionId: string;
}

interface UserTrackerProps {
  apiEndpoint?: string;
  sessionId?: string;
  enableConsoleLog?: boolean;
  trackAllClicks?: boolean; // Track all clicks, not just buttons
}

export default function UserTracker({
  apiEndpoint = '/api/track',
  sessionId,
  enableConsoleLog = false,
  trackAllClicks = false
}: UserTrackerProps) {
  const sessionIdRef = useRef<string>(
    sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  const logClick = async (clickData: ClickData, isNavigationLink = false) => {
    try {
      // Log to console if enabled
      if (enableConsoleLog) {
        console.log('User Interaction Tracked:', clickData);
      }

      // For navigation links, use sendBeacon for reliability or make synchronous request
      if (isNavigationLink && navigator.sendBeacon) {
        // Use sendBeacon for navigation links - it's more reliable
        const blob = new Blob([JSON.stringify(clickData)], { type: 'application/json' });
        navigator.sendBeacon(apiEndpoint, blob);
      } else {
        // Regular fetch for other interactions
        await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clickData),
        });
      }
    } catch (error) {
      console.error('Failed to log click data:', error);
    }
  };

  const handleClick = async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Find the actual clickable element (button, link, etc.)
    const clickableElement = target.closest('button') || 
                            target.closest('a') || 
                            target.closest('[role="button"]') ||
                            (target.classList.contains('btn') || target.classList.contains('button') ? target : null) ||
                            (target.tagName.toLowerCase() === 'button' ? target : null) ||
                            (target.tagName.toLowerCase() === 'a' ? target : null);

    // Check if we should track this element
    const shouldTrack = trackAllClicks || 
                       clickableElement !== null;

    if (!shouldTrack || !clickableElement) return;

    // Check if this is a navigation link
    const isLink = clickableElement.tagName.toLowerCase() === 'a';
    const href = isLink ? (clickableElement as HTMLAnchorElement).href : null;
    const isNavigationLink = isLink && href && 
                           !href.startsWith('javascript:') && 
                           !href.startsWith('#') &&
                           !href.startsWith('mailto:') &&
                           !href.startsWith('tel:');

    const clickData: ClickData = {
      timestamp: new Date().toISOString(),
      elementType: clickableElement.tagName.toLowerCase(),
      elementText: clickableElement.textContent?.trim() || '',
      elementId: clickableElement.id || undefined,
      elementClass: clickableElement.className || undefined,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
      coordinates: {
        x: event.clientX,
        y: event.clientY,
      },
      sessionId: sessionIdRef.current,
    };

    // For navigation links, we need to ensure tracking completes before navigation
    if (isNavigationLink) {
      // Prevent default navigation temporarily
      event.preventDefault();
      
      try {
        // Log the click with navigation flag
        await logClick(clickData, true);
        
        // Small delay to ensure tracking request is sent
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Now proceed with navigation
        if (href) {
          window.location.href = href;
        }
      } catch (error) {
        console.error('Error tracking navigation click:', error);
        // Still navigate even if tracking fails
        if (href) {
          window.location.href = href;
        }
      }
    } else {
      // Regular click tracking (non-navigation)
      logClick(clickData, false);
    }
  };

  useEffect(() => {
    // Add event listener to document to capture all clicks
    document.addEventListener('click', handleClick, true);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

// Export types for external use
export type { ClickData, UserTrackerProps }; 