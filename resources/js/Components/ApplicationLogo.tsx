import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { className, alt = 'CS Finance', ...rest } = props;

    return (
        <img
            src="/images/Logo.png"
            alt={alt}
            className={className}
            {...rest}
        />
    );
}
