import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className = '', 
  children 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6 ${className}`}>
      <div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-slate-400 font-bold mt-2">{subtitle}</p>
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
