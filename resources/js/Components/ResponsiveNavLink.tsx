import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-app-brand-teal bg-app-accent text-app-text focus:border-app-brand-orange focus:bg-app-bg-muted focus:text-app-text'
                    : 'border-transparent text-app-muted hover:border-app-border hover:bg-app-bg-muted hover:text-app-text focus:border-app-border focus:bg-app-bg-muted focus:text-app-text'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
