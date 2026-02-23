import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className = '', 
  titleClassName = 'text-slate-900',
  subtitleClassName = 'text-black',
  children 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6 ${className}`}>
      <div>
        <h2 className={`text-5xl md:text-6xl font-black tracking-tighter flex items-center gap-6 ${titleClassName}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-xl font-semibold mt-2 ${subtitleClassName}`}>{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
