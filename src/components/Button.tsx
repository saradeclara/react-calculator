import React, { MouseEventHandler } from 'react';

interface ButtonProps {
    source: string | number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export default function Button({ source, onClick }: ButtonProps) {
    return (
        <div onClick={onClick} className="button">
            {source}
        </div>
    );
}
