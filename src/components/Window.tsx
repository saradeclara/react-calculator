import { FormEventHandler } from 'react';

interface WindowProps {
    source: string;
    onChange: FormEventHandler<HTMLDivElement>;
    onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function Window({ source, onKeyUp, onChange }: WindowProps) {
    return (
        <input
            autoFocus
            type="text"
            value={source}
            pattern="[0-9\-\+\/\*]*"
            onChange={onChange}
            onKeyUp={onKeyUp}
            className="window"
        />
    );
}
