import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-app-brand-teal text-app-text focus:border-app-brand-orange'
                    : 'border-transparent text-app-muted hover:border-app-border hover:text-app-text focus:border-app-border focus:text-app-text') +
                className
            }
        >
            {children}
        </Link>
    );
}
