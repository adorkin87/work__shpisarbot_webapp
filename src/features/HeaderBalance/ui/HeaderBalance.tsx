import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import cls from './HeaderBalance.module.scss';

import { classNames } from 'src/shared/lib/classNames.ts';

import balance from 'src/entities/balance';

interface HeaderBalanceProps {
    disable?: boolean;
}

const HeaderBalance: FC<HeaderBalanceProps> = observer(({ disable = false }) => {
    let viewBalance: ReactNode;

    switch (balance.state) {
        case 'done':
            viewBalance = (
                <p className={classNames('', { [cls.emptyBalance]: balance.value < 100 })}>{balance.value + 'мин'}</p>
            );
            break;

        case 'error':
            viewBalance = (
                <svg
                    className={cls.balanceError}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.001 10H13.001V15H11.001V10ZM11 16H13V18H11V16Z" />
                    <path d="M13.7679 4.2C13.4199 3.545 12.7419 3.138 11.9999 3.138C11.2579 3.138 10.5799 3.545 10.2319 4.201L2.89395 18.064C2.73112 18.3684 2.65046 18.7101 2.65993 19.0552C2.6694 19.4003 2.76867 19.737 2.94795 20.032C3.12465 20.3284 3.37559 20.5736 3.676 20.7433C3.97641 20.9131 4.3159 21.0015 4.66095 21H19.3389C20.0469 21 20.6879 20.638 21.0529 20.032C21.2319 19.7369 21.331 19.4002 21.3405 19.0551C21.35 18.7101 21.2695 18.3685 21.1069 18.064L13.7679 4.2ZM4.66095 19L11.9999 5.137L19.3439 19H4.66095Z" />
                </svg>
            );
    }

    if (disable) return;

    return (
        <div className={cls.headerBalance}>
            <p>Баланс:</p>
            <Link to={'/payment'}>{viewBalance}</Link>
        </div>
    );
});

export default HeaderBalance;
