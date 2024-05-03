import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import cls from './BtnMenu.module.scss';

import menuStore from 'src/shared/config/menu.store.ts';

interface BtnMenuProps {
    disable?: boolean;
}

const BtnMenu: FC<BtnMenuProps> = observer(({ disable = false }) => {
    const handleBrnClick = (): void => {
        menuStore.toggleSideMenu();
    };

    if (disable) return;

    return (
        <button className={cls.btnMenu} onClick={handleBrnClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z" />
            </svg>
        </button>
    );
});

export default BtnMenu;
