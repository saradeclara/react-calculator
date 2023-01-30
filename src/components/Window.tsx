import React, { FormEventHandler } from 'react';

interface WindowProps {
    source: string;
    onChange: FormEventHandler<HTMLDivElement>;
}

export default function Window({ source, onChange }: WindowProps) {
    return (
        <input type="text" value={source} onChange={onChange} />
        // <div itemType="input" className="window">
        //     {source}
        // </div>
    );
}
