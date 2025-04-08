import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'save' | 'secondary' | 'cancel' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'save',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    save: 'rounded-lg bg-blue-500 px-8 py-3 text-white hover:bg-blue-700',
    secondary: 'bg-[#D3D3D3] text-gray-800 hover:bg-gray-400',
    cancel: 'rounded-lg bg-[#D3D3D3] px-7 py-3 transition hover:bg-red hover:text-white',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-2.5 text-base',
    large: 'px-8 py-3'
  };

  const width = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 
// className="rounded-lg bg-blue-500 px-8 py-3 text-white hover:bg-blue-700"
//  className="rounded-lg bg-[#D3D3D3] px-7 py-3 transition hover:bg-red hover:text-white"