import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'text-only';
}

const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
    const baseStyles = 'px-4 py-2 h-full mx-1 font-semibold rounded cursor-pointer';
    const variantStyles = variant === 'primary'
        ? 'bg-zinc-900 text-white hover:bg-zinc-800'
        : variant === 'secondary'
            ? 'bg-gray-500 text-white hover:bg-gray-600'
            : variant === 'text-only'
                ? 'bg-transparent text-xl text-zinc-100 hover:bg-blue-900/20'
                : '';


    return (
        <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;