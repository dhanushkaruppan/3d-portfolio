import { useState } from 'react';

export default function TiltCard({ children, className = '', style = {}, as: Component = 'div', ...props }) {
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Calculate tilt angles based on mouse position
    const rotateY = x * 10;
    const rotateX = -y * 10;
    
    setTransform(`perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <Component
      className={className}
      style={{ ...style, transform, transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}
