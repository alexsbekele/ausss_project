import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm
        ${hoverEffect ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
