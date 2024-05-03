import { FC } from 'react';

//styles
import cls from './BtnExpand.module.scss';

//lib
import { classNames } from 'src/shared/lib/classNames.ts';

interface BtnExpandProps {
    onOpen: boolean;
    onClick?: () => void;
}

const BtnExpand: FC<BtnExpandProps> = ({ onOpen, onClick }) => {
    return (
        <button className={classNames(cls.btnExpand, { [cls.btnExpand_show]: onOpen })} onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.293 9.29303L12 13.586L7.70697 9.29303L6.29297 10.707L12 16.414L17.707 10.707L16.293 9.29303Z" />
            </svg>
        </button>
    );
};

export default BtnExpand;
