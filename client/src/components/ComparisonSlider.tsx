import { useRef, useState, useEffect } from "react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function ComparisonSlider({ beforeImage, afterImage }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(newPosition, 100));
    setPosition(newPosition);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((touch.clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(newPosition, 100));
    setPosition(newPosition);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] md:h-[600px] relative rounded-xl overflow-hidden shadow-lg mb-8"
    >
      <div 
        className="comparison-slider" 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <div 
          className="before"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${beforeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
            zIndex: 1
          }}
        ></div>
        <div 
          className="after"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${afterImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div 
          className="slider"
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: '4px',
            backgroundColor: 'white',
            cursor: 'ew-resize'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            <span
              style={{
                color: 'var(--primary)',
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              ⟷
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
