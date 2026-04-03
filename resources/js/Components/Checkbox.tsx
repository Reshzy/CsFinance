import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-app-border text-app-brand-teal shadow-sm focus:ring-app-brand-teal ' +
                className
            }
        />
    );
}
