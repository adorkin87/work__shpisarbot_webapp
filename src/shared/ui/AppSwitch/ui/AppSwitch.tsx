import { FC } from 'react';

import cls from './AppSwitch.module.scss';

interface AppSwitch {
    value: boolean;
    setValue: (newValue: boolean) => void;
}

const AppSwitch: FC<AppSwitch> = ({ value, setValue }) => {
    return (
        <label className={cls.appSwitch}>
            <input type="checkbox" checked={value} onChange={() => setValue(!value)} />
            <span className={cls.slider}></span>
        </label>
    );
};

export default AppSwitch;
