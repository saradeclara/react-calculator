import React, { FormEventHandler } from 'react';

interface WindowProps {
    source: string;
    onChange: FormEventHandler<HTMLDivElement>;
    onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
    inputRef: React.LegacyRef<HTMLInputElement> | undefined;
}

export default function Window({
    source,
    onKeyUp,
    onChange,
    inputRef,
}: WindowProps) {
    return (
        <input
            ref={inputRef}
            autoFocus
            type="text"
            value={source}
            pattern="[0-9\-\+\/\*\.]*"
            onChange={onChange}
            onKeyUp={onKeyUp}
            className="window"
        />
    );
}
