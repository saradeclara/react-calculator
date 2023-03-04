import { ButtonProps } from '../helpers/interfaces';

export default function Button({ source, onClick }: ButtonProps) {
    return (
        <div onClick={onClick} className="button">
            {source}
        </div>
    );
}
