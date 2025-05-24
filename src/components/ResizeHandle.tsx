import { useEffect, useRef, useState } from "react";

export function ResizeHandle() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = startX - e.clientX; 
      const newWidth = startWidth + deltaX;
      
      // Update the extension width using the global function
      if (window.updateExtensionWidth) {
        window.updateExtensionWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, startWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    
    // Get current width from the global function
    if (window.getExtensionWidth) {
      setStartWidth(window.getExtensionWidth());
    }
  };

  return (
    <div
      ref={handleRef}
      className="resize-handle"
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '4px',
        height: '100%',
        cursor: 'ew-resize',
        zIndex: 10000,
        background: isDragging ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
        transition: isDragging ? 'none' : 'background-color 0.2s ease',
      }}
      title="Drag to resize extension width"
    />
  );
}
