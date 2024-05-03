import { FC } from 'react';

import cls from './AppCheckbox.module.scss';

interface AppCheckboxProps {
    checked: boolean;
    setChecked: (newValue: boolean) => void;
}

const AppCheckbox: FC<AppCheckboxProps> = ({ checked, setChecked }) => {
    const handleChecked = (): void => {
        setChecked(!checked);
    };

    return (
        <label className={cls.appCheckbox}>
            <input type="checkbox" checked={checked} onChange={handleChecked} />
            <div className={cls.checkbox__checkmark}></div>
        </label>
    );
};

export default AppCheckbox;
