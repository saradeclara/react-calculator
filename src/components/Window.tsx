import { FormEventHandler } from 'react';

interface WindowProps {
    source: string;
    onChange?: FormEventHandler<HTMLDivElement>;
    onKeyUp?: FormEventHandler<HTMLDivElement>;
}

export default function Window({ source, onChange, onKeyUp }: WindowProps) {
    return (
        <input
            type="text"
            value={source}
            pattern="[0-9\-\+\/\*]*"
            onKeyUp={onKeyUp}
            onChange={onChange}
            className="window"
        />
    );
}
