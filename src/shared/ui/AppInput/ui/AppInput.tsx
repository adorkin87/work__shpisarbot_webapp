import { FC, ReactNode } from 'react';

interface AppInputProps {
    value: string;
    setValue?: (newValue: string) => void;
    icon?: ReactNode;
}

const AppInput: FC<AppInputProps> = ({ value, icon }) => {
    return (
        <div>
            <div>{icon}</div>
            <input value={value} />
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.192 6.34399L11.949 10.586L7.70697 6.34399L6.29297 7.75799L10.535 12L6.29297 16.242L7.70697 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z" />
                </svg>
            </button>
        </div>
    );
};

export default AppInput;
