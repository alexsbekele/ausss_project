import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-black transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl',
    secondary: 'bg-yellow-400 text-slate-900 hover:bg-yellow-500 shadow-lg',
    outline: 'bg-transparent border-2 border-slate-200 text-slate-900 hover:border-slate-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-xl border-b-4 border-red-900',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-8 py-4 text-base rounded-2xl',
    lg: 'px-10 py-6 text-2xl rounded-[3rem]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`w-5 h-5 mr-3 ${size === 'lg' ? 'w-8 h-8 mr-4' : ''}`} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={`w-5 h-5 ml-3 ${size === 'lg' ? 'w-8 h-8 ml-4' : ''}`} />
      )}
    </button>
  );
};

export default Button;
