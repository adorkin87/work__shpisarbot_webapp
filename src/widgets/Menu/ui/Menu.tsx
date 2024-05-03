import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import cls from './Menu.module.scss';

import { classNames } from 'src/shared/lib/classNames.ts';

import menuStore from 'src/shared/config/menu.store.ts';
import { MainButtonContext } from 'src/entities/mainButton';

const Menu = observer(() => {
    const mainButton = useContext(MainButtonContext);

    const navigate = useNavigate();
    const location = useLocation();

    let curScrollRef = useRef<number>(0);

    useEffect(() => {
        if (menuStore.isShow && !Telegram.WebApp.isExpanded) {
            Telegram.WebApp.expand();
        }
    }, [menuStore.isShow]);

    useEffect(() => {
        if (menuStore.isShow) {
            mainButton.setFreezeState();
            mainButton.setParams({ text: 'Свернуть меню', is_visible: true }, () => menuStore.toggleSideMenu());
        } else mainButton.returnFreezeState();
    }, [menuStore.isShow]);

    useEffect(() => {
        if (menuStore.isShow) {
            curScrollRef.current = window.scrollY;
            window.scroll(0, 0);
        } else {
            window.scroll(0, curScrollRef.current);
        }

        const body: HTMLBodyElement | null = document.querySelector('body');
        if (body) {
            menuStore.isShow ? (body.style.overflowY = 'hidden') : (body.style.overflowY = 'auto');
        }
    }, [menuStore.isShow]);

    const handleBtnClick = (path: string): void => {
        navigate(path);
        menuStore.toggleSideMenu();
    };

    return (
        <div
            className={classNames(cls.menu, { [cls.menu_active]: menuStore.isShow })}
            onClick={(e) => e.stopPropagation()}>
            {location.pathname !== '/' && <button onClick={() => handleBtnClick('/')}>Главная</button>}
            <button onClick={() => handleBtnClick('/payment')}>Баланс</button>
            <button onClick={() => handleBtnClick('/target')}>Вид деятельности</button>
            <button onClick={() => handleBtnClick('/black-list')}>Черный список</button>
            <button onClick={() => handleBtnClick('/integrations')}>Интеграция с телефонией</button>
            <button onClick={() => handleBtnClick('/about')}>О боте</button>
        </div>
    );
});

export default Menu;
