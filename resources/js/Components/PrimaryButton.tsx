import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-app-cta px-4 py-2 text-xs font-semibold uppercase tracking-widest text-app-cta-text transition duration-150 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-app-brand-teal focus:ring-offset-2 focus:ring-offset-app-bg active:opacity-80 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
