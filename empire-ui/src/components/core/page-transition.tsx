"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClickSpark from '@/components/ui/click-spark';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Start transition
    setIsLoading(true);
    
    // Minimal delay for ultra-smooth transition
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 75); // Very short delay for smooth transition

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={4}
      duration={800}
      sparkCount={8}
      sparkRadius={30}
    >
      <div 
        className={`transition-opacity duration-150 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayChildren}
      </div>
    </ClickSpark>
  );
} 