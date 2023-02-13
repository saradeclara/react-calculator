import { FormEventHandler } from 'react';

interface WindowProps {
    source: string;
    onChange: FormEventHandler<HTMLDivElement>;
}

export default function Window({ source, onChange }: WindowProps) {
    return (
        <input
            autoFocus
            type="text"
            value={source}
            pattern="[0-9\-\+\/\*]*"
            onChange={onChange}
            className="window"
        />
    );
}
