import { FC, useRef, useState, useEffect, MutableRefObject } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";
import "./InfiniteMenu.css";

// Temporary simplified implementation - displays the 3D menu you see
// with working interactive overlays

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items?: MenuItem[];
}

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !items.length) return;

    // Set initial active item
    setActiveItem(items[0]);

    // Create a simple rotating demo
    let rotation = 0;
    let isInteracting = false;
    let animationId: number;

    const animate = () => {
      if (!isInteracting) {
        rotation += 0.005; // Slow rotation
        
        // Change active item every few seconds based on rotation
        const newIndex = Math.floor((rotation * 2) % items.length);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          setActiveItem(items[newIndex]);
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    // Handle mouse/touch interaction
    let isDragging = false;
    let lastX = 0;

    const handleStart = (x: number) => {
      isDragging = true;
      isInteracting = true;
      setIsMoving(true);
      lastX = x;
    };

    const handleMove = (x: number) => {
      if (isDragging) {
        const deltaX = x - lastX;
        rotation += deltaX * 0.01;
        lastX = x;
        
        // Update active item based on manual rotation
        const newIndex = Math.floor((rotation * 2) % items.length);
        if (newIndex !== currentIndex && newIndex >= 0) {
          setCurrentIndex(newIndex);
          setActiveItem(items[newIndex]);
        }
      }
    };

    const handleEnd = () => {
      isDragging = false;
      setTimeout(() => {
        isInteracting = false;
        setIsMoving(false);
      }, 500);
    };

    // Mouse events
    canvas.addEventListener('mousedown', (e) => handleStart(e.clientX));
    canvas.addEventListener('mousemove', (e) => handleMove(e.clientX));
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleStart(e.touches[0].clientX);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    });
    canvas.addEventListener('touchend', handleEnd);

    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', () => {
      canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('mouseup', () => {
      canvas.style.cursor = 'grab';
    });

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', (e) => handleStart(e.clientX));
      canvas.removeEventListener('mousemove', (e) => handleMove(e.clientX));
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
      canvas.removeEventListener('touchstart', (e) => handleStart(e.touches[0].clientX));
      canvas.removeEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [items, currentIndex]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith("http")) {
      window.open(activeItem.link, "_blank");
    } else {
      console.log("Internal route:", activeItem.link);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas 
        id="infinite-grid-menu-canvas" 
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
      />

      {activeItem && activeItem.title && (
        <>
          <h2 className={`face-title ${isMoving ? "inactive" : "active"}`}>
            {activeItem.title}
          </h2>

          <p className={`face-description ${isMoving ? "inactive" : "active"}`}>
            {activeItem.description}
          </p>

          <div
            onClick={handleButtonClick}
            className={`action-button ${isMoving ? "inactive" : "active"}`}
          >
            <p className="action-button-icon">&#x2197;</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteMenu; 