import React, { MouseEventHandler, ReactElement } from 'react';
import { IconType } from 'react-icons/lib/esm/iconBase';
import { FiDelete } from 'react-icons/fi';

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
