import { FC } from 'react';

import cls from './BtnDel.module.scss';

interface BtnDelProps {
    onClick?: () => void;
}

const BtnDel: FC<BtnDelProps> = ({ onClick }) => {
    return (
        <button className={cls.btnDel} onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.192 6.34399L11.949 10.586L7.70697 6.34399L6.29297 7.75799L10.535 12L6.29297 16.242L7.70697 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z" />
            </svg>
        </button>
    );
};

export default BtnDel;
