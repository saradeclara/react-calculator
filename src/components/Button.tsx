import { MouseEventHandler, ReactElement } from 'react';

interface ButtonProps {
    source: ReactElement | string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export default function Button({ source, onClick }: ButtonProps) {
    return (
        <div onClick={onClick} className="button">
            {source}
        </div>
    );
}
