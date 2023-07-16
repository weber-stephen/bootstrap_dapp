import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
  /**
   * Is this button disabled
   */
  disabled?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  children: string | JSX.Element | JSX.Element[];
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  disabled = false,
  size = 'medium',
  children,
  ...props
}: ButtonProps) => {
  const getSizeClasses = (): string => {
    switch(size) {
      case 'small':
        return 'px-2 py-1 text-xs';
      case 'large':
        return 'px-4 py-2.5 text-lg';
      default:
        return 'px-2.5 py-1.5 text-sm';
    }
  }
  
  const sizeClasses = getSizeClasses();
  return (
    <button
      type="button"
      className={classNames([
        'rounded-full font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        disabled ? 'bg-gray-600  focus-visible:outline-gray-600' : 'bg-cyan-500 text-white focus-visible:outline-cyan-800',
        sizeClasses,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};
