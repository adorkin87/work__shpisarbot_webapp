import { FC } from 'react';

import cls from './AppNoData.module.scss';

interface AppNoDataProps {
    text: string;
}

const AppNoData: FC<AppNoDataProps> = ({ text }) => {
    return (
        <div className={cls.appNoData}>
            <p>{text}</p>
        </div>
    );
};

export default AppNoData;
