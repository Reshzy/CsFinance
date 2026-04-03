import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-md border border-app-border bg-app-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-app-text shadow-sm transition duration-150 ease-in-out hover:bg-app-bg-muted focus:outline-none focus:ring-2 focus:ring-app-brand-teal focus:ring-offset-2 focus:ring-offset-app-bg disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
